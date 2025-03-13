import { useEffect, useState } from "react";

import Header from "./components/Header";
import AddEmployeeModal from "./components/AddEmployeeModal";
import EditEmployeeModal from "./components/EditEmployeeModal";
import EmployeeList from "./components/EmployeeList";

function App() {

    const [employees, setEmployees] = useState(() => {
        const savedEmployees = localStorage.getItem("employees");
        return savedEmployees ? JSON.parse(savedEmployees) : [];
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees])

    function addEmployee(newEmployee) {
        setEmployees(prevEmployees => [
            ...prevEmployees,
            {
                ...newEmployee,
                id: Math.max(...prevEmployees.map(emp => emp.id), 0) + 1
            }
        ])
    }

    function editEmployee(updatedEmployee) {

        setEmployees(prevEmployees =>
             prevEmployees.map(emp => 
                emp.id === updatedEmployee.id ? updatedEmployee : emp
            )
        )
    }

    function editClick(employee) {
        setIsEditModalOpen(true);
        setSelectedEmployee(employee)
    }

    function deleteClick(employee) {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");

        if (confirmed) {
            setEmployees(prevEmployees =>
                prevEmployees.filter(emp => emp.id !== employee.id)
            );
            setSelectedEmployees([]);
        }
    }

    function closeEditModal() {
        setIsEditModalOpen(false);
        setSelectedEmployee(null);
    }

    function deleteSelectedEmployees() {
        const confirmed = window.confirm("Are you sure you want to delete the employees?");

        if (confirmed) {
            setEmployees(prevEmployees =>
                prevEmployees.filter(emp => !selectedEmployees.includes(emp.id))
            );
            setSelectedEmployees([]);
        }
    }

    return (
        <div className="container">
            <div className="table-wrapper">
                <Header
                     onOpenAddModal={() => setIsAddModalOpen(true)}
                     onDeleteSelected={deleteSelectedEmployees}
                 />
                 <EmployeeList
                     employees={employees}
                     onEditClick={editClick}
                     onDeleteClick={deleteClick}
                     selectedEmployees = {selectedEmployees}
                     setSelectedEmployees = {setSelectedEmployees}
                 />
                <AddEmployeeModal isOpen={isAddModalOpen} onCloseAddModal={() => setIsAddModalOpen(false)} onAddEmployee={addEmployee} />
                <EditEmployeeModal
                    isOpen={isEditModalOpen}
                    employee={selectedEmployee}
                    onCloseEditModal={closeEditModal}
                    onEditEmployee={editEmployee}
                />
            </div>
        </div>
    )

}

export default App;