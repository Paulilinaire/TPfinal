FROM maven as builder

WORKDIR /app

COPY ./back/pom.xml .
RUN mvn dependency:go-offline

COPY ./back/src ./src
COPY ./back/.env .
RUN mvn package -DskipTests


FROM openjdk:17

WORKDIR /app

COPY --from=builder /app/target/back-0.0.1-SNAPSHOT.jar .
COPY ./back/.env .
COPY ./back/src/main/resources/fake_data/pointing-data.txt .

EXPOSE 9000

ENTRYPOINT ["java", "-jar", "back-0.0.1-SNAPSHOT.jar"]