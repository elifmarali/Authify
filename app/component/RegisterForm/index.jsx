"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid2";
import { Button, Checkbox, FormControl, TextField } from "@mui/material";
import bcrypt from "bcryptjs"; // bcryptjs, bcrypt ile uyumlu

const validationSchema = yup.object({
  name: yup
    .string("Enter your name")
    .min(3, "Name must be 3 characters at minimum")
    .max(30, "Name must be 30 characters at maximum")
    .required("Name is required"),
  surname: yup
    .string("Enter your surname")
    .min(3, "Surname must be 3 characters at minimum")
    .max(30, "Surname must be 30 characters at maximum")
    .required("Surname is required"),
  username: yup
    .string("Enter your username")
    .min(3, "Username must be 3 characters at minimum")
    .max(30, "Username must be 30 characters at maximum")
    .required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password must be 8 characters at minimum")
    .max(30, "Password must be 30 characters at maximum")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your confirm password")
    .min(8, "Confirm password must be 8 characters at minimum")
    .max(30, "Confirm password must be 30 characters at maximum")
    .oneOf([yup.ref("password")], "Password did not match")
    .required("Confirm password is required"),
});

function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      admin: false, // Default admin value
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Şifreyi hash'leme (Asenkron işlemi düzgün kullanmak için await)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(values.password, salt);

        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            surname: values.surname,
            username: values.username,
            email: values.email,
            password: hashedPassword,
            admin: values.admin, // Admin state included
            role: "user", // Assuming "user" role
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (data) {
          resetForm(); // Reset form after successful submission
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <Grid container size={12} direction="row" spacing={2}>
        <Grid item size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
            }}
          >
            Name
          </FormControl>
          <TextField
            fullWidth
            size="small"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
            }}
          >
            Surname
          </FormControl>
          <TextField
            fullWidth
            size="small"
            id="surname"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
        </Grid>
      </Grid>
      <Grid container size={12} direction="row" spacing={2}>
        <Grid item size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
            }}
          >
            Username
          </FormControl>
          <TextField
            fullWidth
            size="small"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
            }}
          >
            E-Mail
          </FormControl>
          <TextField
            fullWidth
            size="small"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
      </Grid>
      <Grid container size={12} direction="row" spacing={2}>
        <Grid item size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
            }}
          >
            Password
          </FormControl>
          <TextField
            type="password"
            fullWidth
            size="small"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item size={6}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
            }}
          >
            Confirm Password
          </FormControl>
          <TextField
            type="password"
            fullWidth
            size="small"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid>
      </Grid>
      <Grid container size={12} direction="row" justifyContent="center">
        <Grid
          item
          size={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
            }}
          >
            Do you want to be an admin?
          </FormControl>
          <Checkbox
            size="small"
            id="admin"
            checked={formik.values.admin}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Button
          type="submit"
          fullWidth
          sx={{
            fontSize: "16px",
            background: "#293fe3",
            color: "#fff",
            padding: "6px",
            ":hover": { background: "#ff4ff3" },
          }}
        >
          Kayıt Ol
        </Button>
      </Grid>
    </form>
  );
}

export default RegisterForm;
