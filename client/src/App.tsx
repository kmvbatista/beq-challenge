import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:8080";

const userId = 'user10'

function App() {
  const [data, setData] = useState<string>();
  const [isDataValid, setIsDataValid] = useState<boolean>(true);

  const dataPayload = data || ''

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL, {headers: {userId}});
    const { data } = await response.json();
    setData(data);
  };

  const updateData = async () => {

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ data:  dataPayload}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        userId
      },
    });
    if(response.ok) {
      toast(<div>Successfully updated</div>)
    }
    await getData();
  };

  const verifyData = async () => {
      const response = await fetch(API_URL+'/verify', {
        method: "POST",
        body: JSON.stringify({ data: dataPayload }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          userId
        },
      })
      const responseData = await response.json();
      if(response.ok) {
        toast(<div>Successfully verified</div>)
        setIsDataValid(true)
      }
      else {
        toast(<div>{responseData.message}</div>)
        setIsDataValid(false)
      }
  };

  const recoverData = async () => {
      const response = await fetch(API_URL+'/recover', {headers: {userId}});
      const recoverData = await response.json();
      if(response.ok) {
        setData(recoverData);
        toast(<div>Successfully recovered</div>)
      }
      else {
        toast(<div>{recoverData.message}</div>)
      }
    
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button disabled={!!!data} style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
        <button disabled={isDataValid} style={{ fontSize: "20px" }} onClick={recoverData}>
          Recover Data
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
