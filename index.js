import express from 'express'
import { PrismaClient } from '@prisma/client'
const app = express()
const prisma = new PrismaClient()
const port =  process.env.PORT || 3000

app.use(express.json())



//get list
app.get('/posts',async(req,res)=>{
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
})

//find post by id 
app.get('/posts/:id',async(req,res)=>{
  
    const {id} = req.params;
    try{
        const post = await prisma.post.findUnique({
            where:{
                id:parseInt(id)
            }
        })
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
          }
      
          res.status(200).json(post);
    }

    catch(error){
        res.status(500).json({ error: "Error fetching post", details: error.message }); 
    }
});

//add
app.post('/posts',async(req,res)=>{
    const {title,author,content,publication_date} = req.body
    try{
       const userAdd = await prisma.post.create({
        data:{
            title,
            author,
            content,
            publication_date: new Date(publication_date)
        }
       })
       res.status(201).json(userAdd)
    }
    catch(error){
        res.status(400).json({ error: "Account creation failed", details: error.message }); 
    }
  
})

//update
app.put('/posts/:id',async (req,res)=>{
   
    const { id } = req.params;
    const { title, author, content, publication_date } = req.body;
  
    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: parseInt(id),  
        },
        data: {
          title,
          author,
          content,
          publication_date: new Date(publication_date)  
        }
      });
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: "Post update failed", details: error.message });
    }
})

//delete
app.delete('/posts/:id',async (req,res)=>{
   

    const { id } = req.params;

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: parseInt(id),  
      }
    });

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ error: "Post deletion failed", details: error.message });
  }

})

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`)
})
