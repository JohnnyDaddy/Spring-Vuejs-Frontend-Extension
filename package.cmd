rem 1. ess frontend build
cd .\ess\frontend
cmd /s /c "call npm i"
cmd /s /c "call npm run build -- --dest ..\backend\src\main\resources\static"

rem 2. ess backend package
cd ..\backend
cmd /s /c "call .\mvnw clean package"

rem 3. extension frontend build
cd ..\..\extension\frontend
cmd /s /c "call npm i"
cmd /s /c "call npm run build -- --dest ..\backend\src\main\resources\static\extensions"

rem 4. extension backend package
cd ..\backend
cmd /s /c "call .\mvnw clean package"