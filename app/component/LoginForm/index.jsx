"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid2";
import { Button, FormControl, TextField } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .required("Password is required"),
});

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          window.location.href = data.redirect;
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 !w-[100%]"
    >
      <Grid container direction="row" spacing={2} className="w-[100%]">
        <Grid item xs={12} className="w-[100%]">
          <FormControl sx={{ paddingBottom: "4px", fontWeight: "600" }}>
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
        <Grid item xs={12} className="w-[100%]">
          <FormControl sx={{ paddingBottom: "4px", fontWeight: "600" }}>
            Password
          </FormControl>
          <TextField
            type="password"
            fullWidth
            size="small"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
      </Grid>
      <Grid container xs={12}>
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
          Giriş Yap
        </Button>
      </Grid>
    </form>
  );
}

export default LoginForm;
