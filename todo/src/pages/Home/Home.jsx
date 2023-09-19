import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [postdata, setPostdata] = useState("");
  const [reload, setReload] = useState(null);
  const [showedit, setShowedit] = useState(false);
  const [editid, setEditid] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [reload]);

  const addData = (event) => {
    event.preventDefault();
    const form = event.target.form;
    const title = form.title.value;
    const content = form.content.value;

    const url = "http://127.0.0.1:8000/"; // Replace
    const data = {
      title: title,
      content: content,

      // Add more key-value pairs as needed
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

  const updateData = (id) => {
    const data = {
      title: postdata,
      // Add more key-value pairs as needed
    };
    fetch(`http://127.0.0.1:8000/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if required
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
    <div>
      <form action="">
        <div>
          <input
            name="title"
            value={postdata}
            onChange={(e) => setPostdata(e.target.value)}
            style={{ padding: "3px" }}
            type="text"
          />
          <input
            name="content"
            value={postdata}
            
            style={{ padding: "3px" }}
            type="text"
          />
         
          
        </div>

        {showedit ? (
          <button onClick={() => updateData(editid)}>update</button>
        ) : (
          <button onClick={addData}>add</button>
        )}
      </form>

      {data.map((todo) => (
        <div key={todo.id} todo={todo}>
          <p>{todo.title}</p>
          <p>{todo.content}</p>

          <button onClick={() => editData(todo.id)}>update</button>
          <button onClick={() => deletePost(todo.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
