import {
    Button,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    useTheme
} from "@mui/material";
import {useState} from "react";
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import config from '../configuration.json';
import {useAuthContext} from "../hook/useAuth";
import Header from "../component/Header";
import {saveCalculations} from "../api/saveCalculations";

const resources = config.resources;
const rules = config.calculationRules;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976d2;',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Main = () => {
    const auth = useAuthContext();
    const theme = useTheme();
    const [resourceName, setResourceName] = useState([]);

    const [resourceAndQuantity, setResourceAndQuantity] = useState(new Map());
    const [calculationResult, setCalculationResult] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const checkIfAllResourcesHaveQuantitySet = () => {
        if (resourceName.length === 0) return false;
        for (const res of resourceName) {
            let result = resourceAndQuantity.get(res.resourceId);
            if (!result || result === "" || isNaN(result)) {
                alert("Calculation error");
                return false;
            }
        }
        return true;
    }

    const doCalculation = () => {
        setCalculationResult([]);
        const impactGWP = "impactGWP100_kgCO2e";
        const impactAP = "impactAP_kgSO2e";
        let isValid = checkIfAllResourcesHaveQuantitySet();
        if (isValid) {
            let newValues = []
            for (const resource of resourceName) {
                let calcRes = {}
                let impacts = resource.impacts[0];
                let quantity = resourceAndQuantity.get(resource.resourceId);
                calcRes.resource = resource;
                calcRes.quantity = quantity;
                calcRes[`${impactGWP}_total`] = (impacts[impactGWP] * quantity).toString();
                calcRes[`${impactAP}_total`] = (impacts[impactAP] * quantity).toString();
                newValues.push(calcRes);
            }
            setCalculationResult(newValues);
            setShowResults(true);

            saveCalculations(newValues);
        }
    }

    const updateResourceQuantity = (event, resourceId) => {
        const quantity = event.target.value;
        let mapCopy = resourceAndQuantity;
        mapCopy.set(resourceId, Number(quantity));
        setResourceAndQuantity(mapCopy);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setResourceName(value);
    };
    return (
        <>
            <Header />
            <div className="main-page-container">
                <div className="resources-container">
                    <FormControl sx={{ m: 1, width: 300, mt: 3 }} size={"small"}>
                        <Select
                            multiple
                            displayEmpty
                            value={resourceName}
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Select resources</em>;
                                }
                                return <em>Select resources</em>;
                                // return selected.name.join(', ');
                            }}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value="">
                                <em>Resources</em>
                            </MenuItem>
                            {resources.map((resource) => (
                                <MenuItem
                                    key={resource.resourceId}
                                    value={resource}
                                >
                                    {resource.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                { resourceName.length > 0 &&
                    <>
                        <div className="table-container">
                            <TableContainer component={Paper} sx={{ width: 450 }}>
                                <Table sx={{ minWidth: 450,}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Resource</StyledTableCell>
                                            <StyledTableCell align="left">Quantity</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {resourceName.map((row) => (
                                            <StyledTableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    <TextField
                                                        onChange={(e) => updateResourceQuantity(e, row.resourceId)}
                                                        style={{width: '100px'}}
                                                        size={"small"}
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                    />
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>

                        <Button variant="contained" onClick={doCalculation}>Calculate</Button>
                    </>
                }

                {/*Result*/}
                { showResults &&
                    <>
                        <h1 style={{ marginTop: '50px', marginBottom: '-9px' }}>Calculation Result</h1>
                        <div className="table-container">
                            <TableContainer component={Paper} sx={{ width: 450 }}>
                                <Table sx={{ minWidth: 450,}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Resource</StyledTableCell>
                                            <StyledTableCell align="left">Quantity</StyledTableCell>
                                            <StyledTableCell align="left">CO2e</StyledTableCell>
                                            <StyledTableCell align="left">SO2e</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {calculationResult.map((row) => (
                                            <StyledTableRow
                                                key={row.resource.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <StyledTableCell component="th" scope="row">
                                                    {row.resource.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.quantity}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {`${Math.round(row["impactGWP100_kgCO2e_total"] * 10) / 10}kg`}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {`${Math.round(row["impactAP_kgSO2e_total"] * 10) / 10}kg`}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </>
                }

            </div>
        </>
    );
}

export default Main;
