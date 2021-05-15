import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "../utils/Fire";
import firebase from "firebase";

export default class Crop extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1,
    },
  };
  file = null;
  myRef = React.createRef();

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  uploadImage() {
    var ref = firebase.storage().ref();
    var file = document.querySelector("#cropped");
    const name = new Date().getTime();
    function loadXHR(url) {

      return new Promise(function (resolve, reject) {
        try {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.onerror = function () {
            reject("Network error.");
          };
          xhr.onload = function () {
            if (xhr.status === 200) {
              resolve(xhr.response);
            } else {
              reject("Loading error:" + xhr.statusText);
            }
          };
          xhr.send();
        } catch (err) {
          reject(err.message);
        }
      });
    }
    loadXHR(file.src).then(function (blob) {
      console.log(blob);
      ref.child("posts/" + name.toString()).put(blob);
    });

  }

  uploadProfilePicture() {
    var ref = firebase.storage().ref();
    var file = document.querySelector("#cropped");
    const name = "test";

    //Check if profile picture exists.

    function loadXHR(url) {
      return new Promise(function (resolve, reject) {
        try {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.onerror = function () {
            reject("Network error.");
          };
          xhr.onload = function () {
            if (xhr.status === 200) {
              resolve(xhr.response);
            } else {
              reject("Loading error:" + xhr.statusText);
            }
          };
          xhr.send();
        } catch (err) {
          reject(err.message);
        }
      });
    }
    loadXHR(file.src).then(function (blob) {
      console.log(blob);
      ref.child("profilepics/" + name.toString()).put(blob);
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="App">
        <div>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <div>
            <img
              id="cropped"
              ref={this.myRef}
              alt="Crop"
              style={{ width: "200px" }}
              src={croppedImageUrl}
            />
            <button
              onMouseDown={() => {
                this.uploadProfilePicture();
                this.props.download();
                window.location.reload(false);
              }}
            >
              Update!
            </button>
          </div>
        )}
      </div>
    );
  }
}
