"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth/client";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Tableuser from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox } from "@mui/material";
import Header from "../component/Header";
import { useRouter } from "next/navigation";

function Panel() {
  const router = useRouter();
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectUsers, setSelectUsers] = useState([]);

  useEffect(() => {
    get_UserList();
  }, []);

  // Get User List
  async function get_UserList() {
    setUsers([]);
    const res = await axios.get("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userIds:selectUsers
      }),
    });

    if (res.data.success) {
      res.data.data.map((item) => {
        if (item.role === "user" && item.admin) {
          setUsers((prev) => [...prev, item]);
        }
      });
    }
  }

  async function toAuthorization() {
    if (selectUsers.length === 0) {
      alert("Lütfen en az bir kullanıcı seçin.");
      return;
    }
  
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds: selectUsers }), // Seçilen kullanıcıları gönderiyoruz
      });
  
      const data = await res.json();
  
      if (data.success) {
        alert("Kullanıcılar başarıyla admin yapıldı!");
        get_UserList(); // Güncellenmiş listeyi tekrar çek
        router.refresh();

      } else {
        alert("Güncelleme başarısız oldu.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  }
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      {auth?.role === "admin" ? (
        <div
          className="w-[100%]"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            gap: "20px",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ width: "70%", bgcolor: "#e55e77" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <Tableuser>
                  <TableCell sx={{ color: "#fff" }}>Select</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Username</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Surname</TableCell>
                  <TableCell sx={{ color: "#fff" }}>E-mail</TableCell>
                </Tableuser>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <Tableuser
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="user"
                      sx={{ color: "#fff" }}
                    >
                      <Checkbox
                        sx={{
                          color: "#fff",
                          "&.Mui-checked": {
                            color: "#fff",
                          },
                        }}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectUsers((prev) => [...prev, user._id]);
                          } else {
                            setSelectUsers(
                              selectUsers.filter((id) => id !== user._id)
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {user.username}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>{user.name}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{user.surname}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>
                  </Tableuser>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            className="w-[70%]"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => toAuthorization()}
            >
              Admin Olsun
            </Button>
          </div>
        </div>
      ) : (
        <div>Admin olmadığınızdan kaynaklı sayfaya erişemezsiniz. </div>
      )}
    </div>
  );
}

export default Panel;
