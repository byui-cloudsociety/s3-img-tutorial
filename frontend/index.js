const imageForm = document.querySelector("#imageForm");
const imageInput = document.querySelector("#imageInput");

// when we click the submit button get an upload url from AWS
imageForm.addEventListener("submit", async event => {
    event.preventDefault();
    const file = imageInput.files[0];

    // the upload url
    const { url } = await fetch("/s3Url").then(res => res.json());
    console.log(url);

    // send our image file back to S3
    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    });

    // url is everything before the query parameters
    const imageUrl = url.split('?')[0];
    console.log(imageUrl);

    // display our image
    const img = document.createElement("img")
    img.src = imageUrl
    document.body.appendChild(img)
})