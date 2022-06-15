import {
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import Header from "../component/Header";
import {useAuthContext} from "../hook/useAuth";
import {getPreviousCalculations} from "../api/getPreviousCalculations";

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

const Archive = () => {

    const auth = useAuthContext();
    const [previousCalculations, setPreviousCalculations] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        getPreviousCalculations()
            .then(response => response.json())
            .then(json => {
                setPreviousCalculations(json);
                setLoaded(true);
            })
            .catch("Can't fetch prevoius calculations!");
    }, []);

    const hasCalculations = previousCalculations.length > 0;

    return (
        <>
            <Header/>
            { isLoaded? (
                <div>
                    <h1>{ hasCalculations? "Previous calculations" : "You didn't do the calculations" }</h1>
                    { hasCalculations
                        ?
                        (<div className="table-container">
                            <TableContainer component={Paper} sx={{ width: 450 }}>
                                <Table sx={{ minWidth: 450}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Resource</StyledTableCell>
                                            <StyledTableCell align="left">Quantity</StyledTableCell>
                                            <StyledTableCell align="left">CO2e</StyledTableCell>
                                            <StyledTableCell align="left">SO2e</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {previousCalculations.map((row) => (
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
                        </div>)
                        : null
                    }
                </div>
            ) : null}
        </>
    );
}

export default Archive;
