import React from "react";
import { useState, useEffect } from "react";
// import Axios from "axios";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
const axios = require("axios").default;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState(false);
  const [allData, setAllData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editingModalInput, setEditingModalInput] = useState();
  const [currentId, setCurrentId] = useState("");
  console.log(allData);

  useEffect(() => {
    axios
      .get(`https://to-do-application-348bd.firebaseio.com/.json`)
      .then((response) => {
        console.log(response.data);
        const fetchedResult = [];
        for (let key in response.data) {
          fetchedResult.push({
            ...response.data[key],
            id: key,
          });
        }
        setAllData(fetchedResult);
        setUpdateValue(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://to-do-application-348bd.firebaseio.com/.json`)
      .then((response) => {
        console.log(response.data);
        const fetchedResult = [];
        for (let key in response.data) {
          fetchedResult.push({
            ...response.data[key],
            id: key,
          });
        }
        setAllData(fetchedResult);
        setUpdateValue(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateValue]);

  const addButtonHandler = (e) => {
    e.preventDefault();
    const data = inputValue;
    axios
      .post(`https://to-do-application-348bd.firebaseio.com/.json`, { data })
      .then((response) => {
        console.log(response.data);
        setUpdateValue(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const editHandler = (e, id, data) => {
    setUpdate(true);
    setEditingModalInput(data);
    setCurrentId(id);
  };

  const deleteHandler = (e, id) => {
    axios
      .delete(`https://to-do-application-348bd.firebaseio.com/${id}.json`)
      .then((response) => {
        console.log(response.data);
        setUpdateValue(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editNote = (e, id, data) => {
    if (editingModalInput !== "") {
      const dat = data;
      alert(e.target);
      alert(dat);
      alert(currentId);
      axios
        .put(
          `https://to-do-application-348bd.firebaseio.com/${currentId}/.json`,
          { data: dat }
        )
        .then((response) => {
          console.log(response.data);
          setUpdateValue(true);
        })
        .catch((error) => {
          console.log(error);
        });
      setUpdate(false);
    }
  };
  const customStyles = {
    content: {
      backgroundColor: "#ccc",
    },
  };

  return (
    <div className="App">
      <div className="header">To-Do-Application</div>
      <form onSubmit={(e) => addButtonHandler(e)}>
        <input
          type="text"
          placeholder="Add Items"
          required
          value={inputValue}
          onChange={(e) => inputHandler(e)}
        />
        <button type="submit" className="addButton">
          Add
        </button>
      </form>
      {allData &&
        allData.map((items) => (
          <div key={items.id} className="content">
            <div className="addedContent">{items.data}</div>
            <div className="addedContent">
              <button
                onClick={(e) => {
                  editHandler(e, items.id, items.data);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              &nbsp;
              <button
                onClick={(e) => {
                  deleteHandler(e, items.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      {allData &&
        allData.map((items) => (
          <Modal style={customStyles} isOpen={update}>
            <input
              className="inputModal"
              value={editingModalInput}
              onChange={(e) => {
                setEditingModalInput(e.target.value);
              }}
            />
            <br />
            <br />
            <button
              className="addModal"
              onClick={(e) => editNote(e, items.id, editingModalInput)}
            >
              Add
            </button>
            &nbsp;
            <button
              className="closeModal"
              onClick={() => {
                setUpdate(false);
              }}
            >
              Close
            </button>
          </Modal>
        ))}
    </div>
  );
}

export default App;
