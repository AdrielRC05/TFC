FROM maven:3.9.4-jdk-17

WORKDIR /app

COPY . .

WORKDIR /app/Backend/TFC

RUN mvn clean package -DskipTests

CMD ["java", "-jar", "target/TFC-0.0.1-SNAPSHOT.jar"]
