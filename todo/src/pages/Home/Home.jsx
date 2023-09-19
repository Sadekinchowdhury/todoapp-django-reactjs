import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./Home.css";
const Home = () => {
  const [data, setData] = useState([]);
  const [postdata, setPostdata] = useState("");
  const [reload, setReload] = useState(null);
  const [showedit, setShowedit] = useState(false);
  const [editid, setEditid] = useState("");
  const [contentdata, setContentdata] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [reload]);

  const addData = (event) => {
    event.preventDefault();
    const form = event.target.form;
    const title = form.title.value;

    const url = `http://127.0.0.1:8000/`; // Replace
    const data = {
      title: title,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if required
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setReload(result);
        setPostdata("");
      });
  };

  // delete
  const deletePost = (id) => {
    const url = `http://127.0.0.1:8000/${id}/`; // Replace

    fetch(url, {
      method: "delete",
    }).then((result) => {
      console.log(result);
      setReload(result);
    });
  };

  const editData = (id) => {
    setEditid(id);

    fetch(`http://127.0.0.1:8000/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostdata(data.title);
        setShowedit(true);
      });
  };

  // update data
  const updateData = (id) => {
    const data = {
      title: postdata,
    };

    fetch(`http://127.0.0.1:8000/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setReload(data);
        setShowedit(false);
        setPostdata("");
      });
  };

  return (
    <div className="container">
      <div className="maincontainer">
      <form className="form-data">
           
            <input
            className="input-field"
              name="title"
              placeholder="TITLE"
              value={postdata}
              onChange={(e) => setPostdata(e.target.value)}
              type="text"
            />

            
           
          <div className="form-group">
              {showedit ? (
                <button onClick={() => updateData(editid)}>update</button>
              ) : (
                <button onClick={addData}>add</button>
              )}
            </div>
        </form>

        <div className="table-container1">
        {data.map((tdata) => (
          <div className="table-container" tdata={tdata} key={tdata.id}>
            <table>
               
              <tbody>
                <tr>
                  <td>{tdata.id}</td>
                  <td>{tdata.title}</td>
                  <td className="button-container">
                    <button onClick={() => editData(tdata.id)}>
                      <AiOutlineEdit size={25} color="black" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deletePost(tdata.id)}>
                      {" "}
                      <AiOutlineDelete size={25} color="red" />{" "}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
