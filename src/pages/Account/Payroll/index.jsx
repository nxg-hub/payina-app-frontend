import React, { useEffect, useState } from 'react';
import { Navbar, Sidebar } from '../_components';
import SetupPayroll from './_components/setup-payroll';
import PayrollDetails from './_components/payroll-details';
import EmployeeDetails from './_components/employee-details';

const Payroll = () => {
  const [data, setData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  // console.log(data);

  useEffect(() => {
    setData((prev) => ({ ...prev, roleData, employeeData }));
  }, [roleData, employeeData]);

  const handleRoleForm = (newData) => {
    roleData.push(newData);
  };
  const handleEmployeeForm = (newData) => {
    employeeData.push(newData);
  };

  const [addRole, setAddRole] = useState([
    <PayrollDetails
      handleRoleForm={handleRoleForm}
      addRole={addRoleForm}
      addEmployeeForm={addEmployeeForm}
    />
  ]);
  const [addEmployee, setAddEmployee] = useState([
    <EmployeeDetails handleEmployeeForm={handleEmployeeForm} addEmployeeForm={addEmployeeForm} />
  ]);
  const [components, setComponents] = useState([<SetupPayroll addRole={addRoleForm} />]);

  function addRoleForm() {
    if (addRole.length > 0) {
      setComponents([addRole[0]]);
    }
  }
  function addEmployeeForm(values) {
    if (addEmployee.length > 0) {
      setComponents([addEmployee[0]]);
    }
    setData((prev) => ({ ...prev, ...values }));
  }

  return (
    <div className="bg-primary">
      <Navbar />
      <Sidebar />
      {components.map((component, i) => (
        <React.Fragment key={i}>{component}</React.Fragment>
      ))}
    </div>
  );
};

export default Payroll;
