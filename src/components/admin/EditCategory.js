import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const EditCategory = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [categoryInput, setCategoryInput] = useState([]);
  const [error, setError] = useState([]);

  const handleInput = (e) => {
    e.persist = () => {};
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const category_id = props.match.params.id;
    axios.get(`/api/edit-category/${category_id}`).then((res) => {
      if (res.data.status === 200) {
        setCategoryInput(res.data.category);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-category");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const updateCategory = (e) => {
    e.preventDefault();
    const category_id = props.match.params.id;
    const data = categoryInput;
    axios.put(`/api/update-category/${category_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        swal("All field are mandetory", "", "error");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-category");
      }
      setLoading(false);
    });
  };

  if (loading) {
    return <h4>Loading Edit Category...</h4>;
  }

  return (
    <div className="container-fluid px-4">
      <form onSubmit={updateCategory}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#seo-tags"
              type="button"
              role="tab"
              aria-controls="seo-tags"
              aria-selected="false"
            >
              SEO Tags
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane card-body border fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="form-group mb-3">
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                onChange={handleInput}
                value={categoryInput.slug}
                className="form-control"
              />
              <small className="text-danger">{error.slug}</small>
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                value={categoryInput.name}
                className="form-control"
              />
              <small className="text-danger">{error.name}</small>
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                name="description"
                onChange={handleInput}
                value={categoryInput.description}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <input
                type="checkbox"
                name="status"
                onChange={handleInput}
                value={categoryInput.status}
              />
              0-Show / 1-Hidden
            </div>
          </div>
          <div
            className="tab-pane card-body border fade"
            id="seo-tags"
            role="tabpanel"
            aria-labelledby="seo-tags-tab"
          >
            <div className="form-group mb-3">
              <label>Meta Title</label>
              <input
                type="text"
                name="meta_title"
                onChange={handleInput}
                value={categoryInput.meta_title}
                className="form-control"
              />
              <small className="text-danger">{error.meta_title}</small>
            </div>
            <div className="form-group mb-3">
              <label>Meta Keywords</label>
              <textarea
                name="meta_keyword"
                onChange={handleInput}
                value={categoryInput.meta_keyword}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <textarea
                name="meta_descrip"
                onChange={handleInput}
                value={categoryInput.meta_descrip}
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 float-end ">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
