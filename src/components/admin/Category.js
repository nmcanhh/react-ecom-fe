import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const Category = () => {
  const [categoryInput, setCategoryInput] = useState({
    slug: "",
    name: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_descrip: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist = () => {};
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };
  const submitCategory = (e) => {
    e.preventDefault();
    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.description,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_descrip: categoryInput.meta_descrip,
    };
    axios.post("/api/store-category", data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        document.getElementById("CATEGORY_FORM").reset();
      } else if (res.data.status === 400) {
        setCategoryInput({ ...categoryInput, error_list: res.data.errors });
      }
    });
  };

  var display_errors = [];
  if (categoryInput.error_list) {
    display_errors = [
      categoryInput.error_list.slug,
      categoryInput.error_list.name,
      categoryInput.error_list.meta_title,
    ];
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Category</h1>
      {display_errors.map((item) => {
        return <p className="mb-1">{item}</p>;
      })}
      <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default Category;
