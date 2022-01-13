import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    //Handle form submission
    async function onSubmit(e) {
        e.preventDefault(); //Form does not get submitted automatically 

        //Calling api to add new record to database

        const newPerson = { ...form };

        await fetch("http://localhost:5000/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        }).catch(error => {
            window.alert(error);
            return;
        });

        setForm({ name: "", position: "", level: "" });

        navigate("/");
    }

    const margin20 = {
        margin: '20px 0px'
    }

    const margin5 = {
        margin: '5px'
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="container mt-5">
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group" style={margin20}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required="required"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group" style={margin20}>
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        required="required"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                    />
                </div>
                <div className="form-group" style={margin20}>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                        style={margin5}
                    />

                    <a href="./" className="btn btn-danger" style={margin5}>Cancel</a>
                </div>
            </form>
        </div>
    );

}