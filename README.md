Image Processing API

\*Contents:

1-Description.

2-How To Use.

3-Testing and Linting.

4-Built With.

5-Development.

\*Description:

building an API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters. The second use case is as a library to serve properly scaled versions of the images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout the site, the API i create will handle resizing and serving stored images for you.

\*How To Use:

1- Start the Server By typing the following in the terminal:
npm run start:end (for the end product).
or
npm run start:dev (for devlopment).

2- Open the browser on the following endpoint: http://localhost:3000/api/image

3-Enter your choice of images in the folder(src/images). and the dimensions for width and length as parameters, as shown in the following example: http://localhost:3000/api/image?filename=fjord&width=1200&height=900

4-If you write the name of the image from the file mentioned previously and it is correct and the sizes are numbers and greater than zero, congratulations, the image will be scaled and saved in a file named thumb And the image will appear to you with the sizes you entered. If there is an incorrect entry, the following message will appear:
(Please write the name of the image you chose from the images, make sure that the name is correct, specify the width and height, and make sure that both are numbers as follows (http://localhost:3000/api/image?filename=fjord & width=400 & height=200 )).

\*Testing and Linting

1-formating:
by run prettier By typing the following in the terminal: (npm run prettier).

2- lining
by run eslint By typing the following in the terminal: (npm run eslint).

3- testing
by run jasmine By typing the following in the terminal: (npm run test).

\*Built With:

1- NodeJS - The JavaScript runtime.

2- Express - The web framework.

3- TypeScript - The language used.

4- Sharp - NodeJS image processor.

\*Development:
Haitham Elsherbiny.
