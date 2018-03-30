# Building an API for your Medium posts with Google Cloud Functions


## Background

I needed a way to easily query my medium posts client-side for my [personal blog](https://tristansokol.com/) & wanted to try out writing my first [Google Cloud Shell Tutorial](https://cloud.google.com/shell/docs/tutorials). Through this post, we will create a publicly accessible endpoint to get a json feed of your medium posts.

**Before you begin**:
* Make sure you have a medium account in mind that you want posts from
* Have a Google Cloud Platform account
* Familiarity with Google Cloud Platform command line tools will help.

Click the **Continue** button to move to the next step.


## Doesn't Medium already have an API?

Yes! [Medium has an API](https://github.com/Medium/medium-api-docs) that seems primarily designed to let you publish posts. That won't help me much in getting my content. What is really helpful is the undocumented `json` format that you can request of just about every medium page. All you need to do is append `?format=json` to your request. For me, my latest posts are listed at [`https://medium.com/@tristansokol/latest`](https://medium.com/@tristansokol/latest) and [`https://medium.com/@tristansokol/latest?format=json`](https://medium.com/@tristansokol/latest?format=json) has all that information in a somewhat convenient json format. The only reason I don't pump that into my page is the explicit preventions that Medium prepends to the json (`])}while(1);</x>`). Oh well, nobody can stop determination & javascript!

## Setting up Google Cloud

First things first, you need to set your current cloud project.
```bash
gcloud config set project YOUR_PROJECT_NAME
```
Next, see if cloud functions are enabled for your project with a command like:
```bash
gcloud functions list
```
If they are not, you should get a response like
```
API [cloudfunctions.googleapis.com] not enabled on project
[single-cirrus-142722]. Would you like to enable and retry?  (y/N)?
```
 and a simple `y` will enable the appropriate APIs.

## The code
Take a look at `walkthrough editor-open-file medium-get-latest-api-function-tutorial/index.js "index.js"`.

You can edit a file stored in Cloud Shell using Cloud Shell’s built-in text editor, isn't that neat! The code is pretty basic, basically a wrapper around a single request and stripping out the cross site preventions.
```javascript
exports.getLatest = (req, res) => {
  let username = 'yourusername';
  request('https://medium.com/@' + username + '/latest?format=json', function(error, response, body) {
    res.send(JSON.parse(body.substring(16)));
  });
};
```

**Edit the username to your Medium username!**

## Deploy the function

After you have saved your username to the `index.js`, deploy your function with:
```bash
gcloud functions deploy getLatest --trigger-http
```

The big G handles all of your dependencies by reading the `package.json`, so you don't have to worry about uploading anything else.
## Call your new API!

After your deploy is complete, you should see some output similar to

```yaml
httpsTrigger:
  url: https://us-central1-super-burrito-212121.cloudfunctions.net/getLatest
```

And you can then try out your new API:
```bash
curl https://us-central1-super-burrito-212121.cloudfunctions.net/getLatest
```
and you should get back a bunch of json about your latest posts on Medium.

<walkthrough-conclusion-trophy></walkthrough-conclusion-trophy>
