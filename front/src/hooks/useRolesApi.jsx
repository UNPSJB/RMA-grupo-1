import { useState, useCallback, useEffect } from "react";
import axios from "../api/axios";

// C
const useCreateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRole = async (role) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/roles", role);
      return response.data;
    } catch (err) {
      setError("Error al crear el rol");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createRole };
};

//R

const useRoles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/roles");
      setRoles(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener los roles");
      console.error("Error al obtener los roles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return { roles, loading, error, getRoles };
};

// U
const useUpdateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateRole = async (roleId, role) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/roles/${roleId}`, role);
      return response.data;
    } catch (err) {
      setError("Error al actualizar el rol");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateRole };
};

// D
const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRole = async (roleId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`/roles/${roleId}`);
      return response.data;
    } catch (err) {
      setError("Error al eliminar el rol");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteRole };
};

const useRoleAssign = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const assignRole = async (roleUserData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/rolesassign", roleUserData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data || "Error al asignar el Rol");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { assignRole, loading, error, success };
};

export { useCreateRole, useRoles, useUpdateRole, useDeleteRole, useRoleAssign };
