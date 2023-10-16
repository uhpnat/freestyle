const dataId = localStorage.getItem("dataIdLogin");
const urlAuthor = "https://backend-qu7a.onrender.com/v1/author/id/" + dataId;
const urlTheme = "https://backend-qu7a.onrender.com/v1/theme/";
console.log(urlAuthor);
fetch(urlAuthor)
  .then((response) => response.json())
  .then((response) => {
    const authorName = response.name;
    const authorImage = response.image;
    const authorDesc = response.desc;
    const linkWeb = './testapipro.html?link=' + response.link;
    document.getElementById("authorName").innerText = authorName;
    document.getElementById("headerName").innerText = authorName;
    document.getElementById("authorDESC").innerText = authorDesc;
    document.getElementById("authorImage").src = authorImage;
    document.getElementById("editName").value = authorName
    document.getElementById("editDESC").value = authorDesc
    document.getElementById("linkWeb").href =  linkWeb
    //render sản phẩm
    function renderProductHtml(data){
      return `
      <div class="pb-4 col-md-4 col-sm-6 grid-item creative">
      <a href="${data.linkproduct}" class="work-content">
        <div class="portfolio-item rounded shadow-dark">
          <div class="details">
            <span class="term"
              ><em>Sản Phẩm</em></span
            >
            <h4 class="title">
            ${data.name}
            </h4>
            <span class="more-button">
              <i class="icon-options"></i>
            </span>
          </div>
          <div class="thumb">
            <img
              width="1"
              height="1"
              src=" ${data.linkimage}"
              class="attachment-560x455 size-560x455 wp-post-image"
              alt=""
              decoding="async"
              loading="lazy"
            />
            <div class="mask"></div>
          </div>
        </div>
      </a>
    </div>
      `
    }
    document.getElementById("renderProducts").innerHTML = response.theme.map((response)=>renderProductHtml(response)).join("")

    if(response.background){
      var styleElement = document.createElement('style');
      var cssCode = `
      body {
        background-image: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.88)), url('${response.background}');
        background-size: cover;
        background-position: center center; 
        background-attachment: fixed;
      }
    `;
    styleElement.innerHTML = cssCode;
    document.head.appendChild(styleElement);
    }
  })
  .catch((error) => console.log(error));
//   fetch(url, 
//     {
//       method: "POST",
//       headers: {   
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: user.displayName,
//         email: user.email,
//         image: user.photoUrl,
//         id: user.localId,
//         link: document.querySelector('#dataLink').value
//       })
//     }
// )
//     .then((response) => {
//         console.log("Đăng kí vào dữu liệu thành công");
//     })
//     .catch((error) => {
//         console.log("lỗi");
//     });



// chức năng thay đổi tên và desc
function showSuccessMessage() {
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';
  setTimeout(function() {
      successMessage.style.display = 'none';
  }, 3000); // 3 giây
}
const editUser = ()=>{
  const editName = document.getElementById("editName").value
  const editDESC = document.getElementById("editDESC").value
  if(editDESC && editName){
      fetch(urlAuthor, 
        {
          method: "PUT",
          headers: {   
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: editName,
            desc: editDESC
          })
        }
      )
    .then((response) => {
        console.log("thay đổi tên và desc thành công");
        document.getElementById("authorName").innerText = editName
        document.getElementById("authorDESC").innerText= editDESC
        document.getElementById("headerName").innerText = editName;

        showSuccessMessage()

    })
    .catch((error) => {
        console.log("lỗi");
    });
  }
}
// chức năng thay đổi ảnh đại diện
const imageInput = document.getElementById("editAvatar");

const editAvatar = ()=>{
  const formData = new FormData();
        const imageInput = document.getElementById("editAvatar");
        if (imageInput.files.length > 0) {
          formData.append("image", imageInput.files[0]);
          fetch("https://backend-qu7a.onrender.com/uploads", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => response.imagePath)
            .then((response) => {
              var renderImage = 'https://backend-qu7a.onrender.com/uploads/'+response
              const dataToSend = {
                image : 'https://backend-qu7a.onrender.com/uploads/'+response
              };
              const requestOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
              };
              fetch(urlAuthor,requestOptions)
              .then((response) =>{
                console.log(response);
                console.log(renderImage);
                document.getElementById("authorImage").src= renderImage
                document.querySelector('.mfp-close').click()
        showSuccessMessage()

              } )
            })
        } else {
          console.log("Chưa chọn tệp hình ảnh.");
        }
}

const editBackground = ()=>{
  const formData = new FormData();
        const imageInput = document.getElementById("editBackground");
        const imageInput1 = document.getElementById("editBackground");
        console.log(imageInput); 
        console.log(imageInput1); 
        if (imageInput.files.length > 0) {
          formData.append("image", imageInput.files[0]);
          fetch("https://backend-qu7a.onrender.com/uploads", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => response.imagePath)
            .then((response) => {
              var renderImage = 'https://backend-qu7a.onrender.com/uploads/'+response
              const dataToSend = {
                background : 'https://backend-qu7a.onrender.com/uploads/'+response
              };
              const requestOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
              };
              fetch(urlAuthor,requestOptions)
              .then((response) =>{
                console.log(response);
                console.log(renderImage);
                var styleElement = document.createElement('style');
                var cssCode = `
                body {
                  background-image: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.88)), url('${renderImage}');

                  background-size: cover;
                  background-position: center center; 
                  background-attachment: fixed;
                }
              `;
              styleElement.innerHTML = cssCode;
              document.head.appendChild(styleElement);
              document.querySelector('.mfp-close').click()
                // document.getElementById("authorImage").src= renderImage
        showSuccessMessage()

              } )
            })
        } else {
          console.log("Chưa chọn tệp hình ảnh.");
        }
}

const defaultBackground = ()=>{
  const formData = new FormData();
              const requestOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({background: null})
              };
              fetch(urlAuthor,requestOptions)
              .then((response) =>{
                var styleElement = document.createElement('style');
                var cssCode = `
                .content-1 {
                  background: #f9f9ff;
                }
              `;
              styleElement.innerHTML = cssCode;
              document.head.appendChild(styleElement);
              document.querySelector('.mfp-close').click()
        showSuccessMessage()

              } )
}
const addProductImage = ()=>{
  fetch(urlAuthor)
  .then((response) => response.json())
  .then((response)=>{
    const nameProductImage = document.getElementById("nameProductImage").value
    const descProductImage = document.getElementById("descProductImage").value
    const linkProductImage = document.getElementById("linkProductImage").value
    const linkProductProduct = document.getElementById("linkProductProduct").value
      if(nameProductImage && descProductImage && linkProductImage && linkProductProduct ){
        fetch(urlTheme,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json' // Loại dữ liệu bạn gửi đi
            },
            body: JSON.stringify({
             author: response._id,
              name : nameProductImage,
              desc : descProductImage,
              linkimage : linkProductImage,
              linkproduct : linkProductProduct
            })
          })
        .then((response) =>{
          console.log('thành công');
          document.querySelector('.mfp-close').click()
        showSuccessMessage()

        })
        .catch((error) =>{
          console.log('error',error);
        })
        
      }else{
        console.log('rổng');
      }
})}