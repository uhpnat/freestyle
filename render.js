// const currentUrl = window.location.href;
// const url = window.location.href;
// const queryString = new URL(currentUrl).searchParams;
// const link = queryString.get("link");
// console.log(link);
// const urlAuthor = "https://backend-qu7a.onrender.com/v1/author/" + link;
// console.log(urlAuthor);
// fetch(urlAuthor)
//   .then((response) => response.json())
//   .then((response) => {
//     console.log(response);
//     const authorName = response.name;
//     const authorImage = response.image;
//     console.log(authorName);
//     document.getElementById("authorName").innerText = authorName;
//     document.getElementById("authorImage").src = authorImage;
//   });


var loadingSpinner = document.getElementById('loadingSpinner');
  
function showLoadingSpinner() {
  loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
  loadingSpinner.style.display = 'none';
}

const currentUrl = window.location.href;
const url = window.location.href;
const queryString = new URL(currentUrl).searchParams;
const link = queryString.get("link");
console.log(link);
const urlAuthor = "https://backend-qu7a.onrender.com/v1/author/link/" + link;
console.log(urlAuthor);
showLoadingSpinner();

fetch(urlAuthor)
  .then((response) => response.json())
  .then((response) => {
    const authorName = response.name;
    const authorImage = response.image;
    const authorDesc = response.desc;
    document.getElementById("authorName").innerText = authorName;
    // document.getElementById("headerName").innerText = authorName;
    document.getElementById("authorDESC").innerText = authorDesc;
    document.getElementById("authorImage").src = authorImage;
    //render sản phẩm
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
    hideLoadingSpinner()

  })
  .catch((error) => {
    console.error('Lỗi khi tải dữ liệu từ API:', error);
    // Xử lý lỗi khi không thể kết nối với API
    hideLoadingSpinner()

  });



  var pages = 1; // Biến toàn cục để theo dõi trang hiện tại

  var prevPage = () => {
    showLoadingSpinner();

    if (pages > 1) {
      pages--; // Giảm giá trị của trang để truy vấn trang trước
      loadPage();
    }else{
      hideLoadingSpinner()

    }
  };
  
  var nextPage = () => {
    showLoadingSpinner();

    pages++; // Tăng giá trị của trang để truy vấn trang tiếp theo
    checkNextPage();
  };
  
  function checkNextPage() {
    var linkProduct = 'https://backend-qu7a.onrender.com/v1/author/product/';
    var fullLink = linkProduct + link + '?limit=3&page=' + pages;
    console.log(fullLink);
  
    fetch(fullLink)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response && response.length > 0) {
          loadPage();
        } else {
          // Hiển thị thông báo lỗi hoặc thực hiện xử lý lỗi khác tại đây
          console.log('Không có sản phẩm nào ở trang tiếp theo.');
          --pages
          hideLoadingSpinner()

        }
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu từ API:', error);
        // Xử lý lỗi khi không thể kết nối với API
        hideLoadingSpinner()

      });
  }
  
  function loadPage() {

    var linkProduct = 'https://backend-qu7a.onrender.com/v1/author/product/';
    var fullLink = linkProduct + link + '?limit=3&page=' + pages;
    console.log(fullLink);
  
    fetch(fullLink)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response && response.length > 0) {
          function renderProductHtml(data) {
            return `
              <div class="pb-4 col-md-4 col-sm-6 grid-item creative">
                <a href="${data.linkproduct}" class="work-content">
                  <div class="portfolio-item rounded shadow-dark">
                    <div class="details">
                      <span class="term"><em>Sản Phẩm</em></span>
                      <h4 class="title">${data.name}</h4>
                      <span class="more-button"><i class="icon-options"></i></span>
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
            `;
          }
          document.getElementById('renderProducts').innerHTML = response
            .map((response) => renderProductHtml(response))
            .join('');
            hideLoadingSpinner()
        } else {
          // Hiển thị thông báo lỗi hoặc thực hiện xử lý lỗi khác tại đây
          console.log('Không có sản phẩm nào.');
          hideLoadingSpinner()
        }
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu từ API:', error);
        hideLoadingSpinner()
        // Xử lý lỗi khi không thể kết nối với API
      });
  }
  
  // Ban đầu, tải trang đầu tiên
  loadPage();
  