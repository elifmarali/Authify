"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid2";
import { Button, Checkbox, FormControl, TextField } from "@mui/material";
var passwordHash = require("password-hash"); // password-hash kütüphanesi

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password must be 8 characters at minimum")
    .max(30, "Password must be 30 characters at maximum")
    .required("Password is required"),
});

function LoginForm() {
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
        // Şifreyi hash'leme
        var hashedPassword = passwordHash.generate(values.password);
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
      <Grid container direction="row" spacing={2}>
        <Grid item size={12}>
          <FormControl
            sx={{
              paddingBottom: "4px",
              fontWeight: "600",
              fontFamily: "roboto",
            }}
          >
            Email
          </FormControl>
          <TextField
            type="email"
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
        <Grid item size={12}>
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
          Sign In
        </Button>
      </Grid>
    </form>
  );
}

export default LoginForm;
