import express from 'express'
const app = express()
const port =  process.env.PORT || 3000

app.use(express.json())

let userData = []
let Id = 1

app.get('/posts',(req,res)=>{
    res.status(201).send(userData)
})

app.get('/posts/:id',(req,res)=>{
    const userId = userData.find(U=>U.Id === parseInt(req.params.id))
    if(!userId){
        return res.status(404).send('User Not found')
    }
    res.status(201).send(userId)
})
//adding
app.post('/posts',(req,res)=>{
    const {title,author,content,publication_date} = req.body
    const userAdd = {Id:Id++,title,author,content,publication_date}
    userData.push(userAdd)
    res.status(201).send(userAdd)
})


app.put('/posts/:id',(req,res)=>{
    const userId = userData.find(U=>U.Id === parseInt(req.params.id))
    const {title,author,content,publication_date} = req.body
    userId.title = title
    userId.author = author
    userId.content = content
    userId.publication_date = publication_date
    res.status(200).send(userId)
})

app.delete('/posts/:id',(req,res)=>{
    const index = userData.findIndex(i=>i.Id === parseInt(req.params.id))
    if(index === -1 ){
        return res.status(404).send('User Not found')
    }
    userData.splice(index,1)
    res.status(200).send('Deleted')
})

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`)
})