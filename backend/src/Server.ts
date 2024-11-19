import app from "./App";

const port = process.env.PORT || 6000;
app.listen(port, ()=>{
  console.log(`Server running on http://localhost:${port}`);
})