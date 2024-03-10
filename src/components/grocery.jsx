import { useEffect, useState } from "react";
import "./grocery.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let Grocery = () => {
  const [groceryName, setGroceryName] = useState("");
  const [items, setItems] = useState([]);
  
  

  let addItem = () => {
    if (groceryName == "") {
      toast.error("Input Feild Is Empty")
    } 
    else {
      setItems([...items, groceryName]);
      setGroceryName("");
      toast.success("Item Added To The List");
    }

    
  };

  let line_Through = (e) => {
    if (e.target.value == "on") {
      e.target.value = "off";
      e.target.parentElement.childNodes[1].style.textDecoration =
        "line-through";
    } else {
      e.target.value = "on";
      e.target.parentElement.childNodes[1].style.textDecoration = "none";
    }
  };

  let removeItem = (key) => {
    let filter = items.filter((element, index) => index != key);
    setItems([...filter]);
    toast.success("Item Deleted");
  };

  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem("item"));
    if(arr && arr.length > 0){
      setItems([...arr])
    }
    
  }, [])

  useEffect(() => {
      localStorage.setItem("item" , JSON.stringify(items))
  } , [items])

 



  return (
    
    <div className="main">
      <div className="grocery">
        <h2>Grocery Bud</h2>
        <div className="input">
          <input
            type="text"
            value={groceryName}
            onChange={(e) => setGroceryName(e.target.value)}
          />
          <button onClick={addItem}>Add item</button>
        </div>
        <div className="items">
          {items.map((element, index) => (
            <div className="item" key={index}>
              <input type="checkbox" onChange={line_Through} />
              <p>{element}</p>
              <button onClick={() => removeItem(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            bodyClassName= "toastbody"
        />

    </div>
  );
};

export default Grocery;
