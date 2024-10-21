# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Stage 0: Base image for running the application in fast mode during debugging
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Stage 1: Build the client-side app
FROM node:18-alpine AS client-build
WORKDIR /client
# Copy the client app code
COPY ServiceStackBaseCms.Client/ ./
# Install npm dependencies and build the client app
RUN npm install
RUN npm run build

# Stage 2: Build the .NET service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ServiceStackBaseCms/ServiceStackBaseCms.csproj", "ServiceStackBaseCms/"]
COPY ["ServiceStackBaseCms.Components/ServiceStackBaseCms.Components.csproj", "ServiceStackBaseCms.Components/"]
COPY ["ServiceStackBaseCms.Domain/ServiceStackBaseCms.Domain.csproj", "ServiceStackBaseCms.Domain/"]
COPY ["ServiceStackBaseCms.ServiceModel/ServiceStackBaseCms.ServiceModel.csproj", "ServiceStackBaseCms.ServiceModel/"]
COPY ["ServiceStackBaseCms.ServiceInterface/ServiceStackBaseCms.ServiceInterface.csproj", "ServiceStackBaseCms.ServiceInterface/"]
RUN dotnet restore "./ServiceStackBaseCms/ServiceStackBaseCms.csproj"
COPY . .
WORKDIR "/src/ServiceStackBaseCms"
RUN dotnet build "./ServiceStackBaseCms.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Stage 3: Publish the .NET service project
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ServiceStackBaseCms.csproj" -c "$BUILD_CONFIGURATION" -o /app/publish /p:UseAppHost=false


# Stage 4: Final stage for production or regular mode running
FROM base AS final
WORKDIR /app
# Copy the published .NET app from the publish stage
COPY --from=publish /app/publish .
# Copy the client-side build files from the client-build stage into the wwwroot folder
COPY --from=client-build /client/dist ./wwwroot

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "ServiceStackBaseCms.dll"]
