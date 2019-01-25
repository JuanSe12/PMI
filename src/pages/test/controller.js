import DataService from "../../services/data_service.js"

DataService.getAllProjects().then(
    data => {
        console.log(data)
    }
)