# Vista
Video sharing website where users can share interesting videos from diverse platforms and chat with others. Users can easily share videos with chrome extension.

## Demo
### Demo video is available in [https://youtu.be/APZCwddL2y4](https://youtu.be/APZCwddL2y4)

<a href="https://youtu.be/APZCwddL2y4"><img src="/img/video_thumbnail.png" alt="video_intro" width="70%" ></a>
<br/>


## Description
Vista is a video sharing web site where users can share interesting videos from diverse platforms and chat with others. These days, SNS like Facebook is the most popular platform for the user to share their interests. However, there are too diverse contents to share in SNS and there is no web site other than SNS that helps to collect interesting videos from different video platforms. Thus, I decided to develop new video sharing platform to meet those users’ needs.
  
In the design process, I found that there was a critical problem in video sharing process. The problem was that it is too annoying to get the embedding iframe code from the video and manually post it on the web site. So, I changed the initial technical choice to improve efficiency of the sharing process. The solution was to add chrome extension for sharing process. When users find interesting videos, they can just press button on the top-right to share them automatically. The result was that the time spent for sharing process was decreased from more than 5 seconds to 1 second. Despite there are some compatibility issues for other browsers, I think that the benefit of efficiency compensates for those disadvantages.
  
Also, I chose to use React.js as the Frontend framework for the web site because the web page needs frequent reloading for new posts. Users can keep track of latest post of the website without manually refreshing the website as React.js only reloads the DOM object that has been changed by the server. I think this choice helped to reduce unnecessary waiting times for users. 

## Installation
```sh
$ npm install -g webpack babel nodemon cross-env
$ npm install
```
Also, mongoDB should be run on default port (27017).

## How To Start

### (1) Operate local web site.
```sh
$ npm run start
```

Then, enter localhost:3000 in your browser url tab to access Vista web site.

### (2) Install chrome extension to chrome browser.

Enter chrome://extensions in your chrome borwser url tab to access chrome extensions manager.

Load Vista/chrome_extension folder as extension program and then enable it.

## Technologies
* node.js
* express
* react.js
* chrome extension
* iframely
* materializecss
* mongoDB
* socket.io

## References
* tutorialspoint react.js tutorial : [https://www.tutorialspoint.com/reactjs/](https://www.tutorialspoint.com/reactjs/)
* react.js codelab tutorial: [https://velopert.com/tag/reactcodelab](https://velopert.com/tag/reactcodelab)
