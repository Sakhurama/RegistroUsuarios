const URL = "http://localhost:3000/save-data";


document.getElementById("formulario").addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
    }

    try {
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if(response.ok){
            alert("Usuario creado correctamente");
            console.log(response);
            console.log("Datos enviados: ", formData);
        } else {
            alert("Error en la petición");
            console.error("Error en la petición");
        }
    } catch (error) {
        console.error("Error: ", error);
    } finally {
        document.getElementById("formulario").reset();
    }
})