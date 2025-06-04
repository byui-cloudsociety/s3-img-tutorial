# Upload images from localhost app to an AWS S3 Bucket

## Step 1: Set up dev environment

- Start your AWS lab instance through the AWS Canvas portal

- Begin by locating where you want to place this repository on your computer. In my case, I have a CloudSociety folder on my desktop where I drop all our lab projects into. Either download this repository and drag it where you like or open the folder of your choice and clone it to your own computer using the Git command below.

```
 git clone repo-link
```

- Open this project in your preferred code editor, I will use VSCode. There will be two folders in the repo, _frontend_ and _backend_, change directories into the backend folder so that we can install the necessary node libraries to get this app working!

- On VSCode you can open a terminal by clicking on _Terminal_ at the top left of your editor or by pressing the keyboard shortcut _Ctrl + Shift + `_

```
cd .\backend\
s3-img-tutorial\backend>__     # hopefully this is where you're at in the terminal!
```

Assuming you have Node install on your computer go ahead and run the following code so that we install the necessary packages from AWS, Express, etc. This code will install all the libraries found in the existing package.json file.

```
npm install
```

## Step 2: Environment Variables

- In your code editor, create a new file named _.env_ and place it inside the backend folder.

- Add the following variables inside the file, these are used to validate that we are allowed to connect to the S3 bucket

- Locate your access keys/session tokens from the AWS Canvas portal where you launched the lab.
- Click on _AWS Details_ and then _AWS CLI: Show_

```
AWS_ACCESS_KEY_ID=random_string_characters_from_canvas
AWS_SECRET_ACCESS_KEY=random_string_characters_from_canvas
AWS_SESSION_TOKEN=random_string_characters_from_canvas
```

## Step 3: Create AWS S3 Bucket!

We are going to create an S3 Bucket which is a data storage container! This will hold our images that we are going to upload from the html page. We are going to grant public access and create a policy or set of rules for the type of data operations that we can perform.

- Direct yourself to the AWS Management Console via your learner lab or personal AWS account.

- Search for _S3_ in the top left corner of the page, go ahead and click on it!

- Click _Create new bucket_

- Enter the bucket name: _s3-img-tutorial_

- Unselect the checkbox for _Block all public access_ and check the box for the acknowledgement below that

- Click _Create new bucket_

## Step 4: Bucket Policy & CORS

- Click on the name of your bucket

- Click on _Permissions_ and scroll down to _Bucket Policy_ and click on _Edit_ on the right side

- Copy the JSON snippet below and paste it into the Policy field.

- Make sure to adjust the _Resource_ value to match your S3 bucket name!!

```
{
    "Version": "2012-10-17",
    "Id": "Policy1748929545428",
    "Statement": [
        {
            "Sid": "Stmt1748929536909",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
            ]
            "Resource": "arn:aws:s3:::YOUR-S3-BUCKET-NAME-GOES-HERE/*"
        }
    ]
}
```

- Click on _Save changes_ and ignore the red warning/error message if it mentions something about lab roles!

- Scroll down to _Cross-origin resource sharing (CORS)_ and click on _Edit_ towards the right

- Insert the following snippet in the text field and click on _Save Changes_

```
[
    {
        "AllowedHeaders": [
                "*"
        ],
        "AllowedMethods": [
            "PUT",
            "HEAD",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

## Step 5: Upload an Image to the S3 Bucket

- Within the backend folder enter the following command to start the server.

```
s3-img-tutorial/backend> npm run dev
```

- Open a web browser and direct to (s3 app)[localhost:8080]

- Right click on the page and click on _Inspect_, watch the browser console!

- Upload an image file from your computer and click submit!

- You should see the image on the web page and also on the S3 console, go check!

# IGNORE

## Create new IAM role

- Direct to the _IAM_ console in the top left search bar and click on _Policies_ on the left side

- Click on _Create New Policy_ and select/search for S3 in the drop down.

- Under _Access Level_, open the _Write_ accordion and select the box for _PutObject_

- Scroll down to the _Resources_ section and ensure that the _Specific_ option is selected. Click on the _Add ARNs_ link!

- When the modal pops up, type in your bucket name in the _Resource bucket name_ field.

- For _Resource object name_, leave the input field blank and select the _Any object name_ box

- Click _Add ARNs_

- Ignore the red messages if they are about not having voclab permissions, click on _Next_

- In the _Review and Create_ section, enter your bucket name for the policy name

- Click _Create policy_

## Create IAM user

- Now back at the IAM console, click on _Users_ on the left side and then _Create User_

- Enter your bucket name for the username or whatever makes sense and then click _Next_

- For _Permissions Options_, select the option for _Attach policy directly_

- For _Permission policies_, search and select the policy name we made in the previous step

- Click _Next_ and then click _Create user_
