FROM maven:3.8.3-openjdk-17-slim AS build
COPY src /app/src
COPY pom.xml /app
RUN mvn -f /app/pom.xml clean package -DskipTests

FROM openjdk:17-alpine
ENV SPRING_PROFILES_ACTIVE=docker
WORKDIR /app
COPY init-mongo.js /docker-entrypoint-initdb.d/
COPY --from=build /app/target/*.jar challenge.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "challenge.jar"]
