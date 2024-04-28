const zod = require('zod')
var year  = new Date().getFullYear()
const userDataCheck = zod.object({
    userEmail : zod.string().email(),
    userPassword : zod.string().min(8)
})
const inputCheck = zod.object({
    title:zod.string(),
    author:zod.string().min(1),
    publicationYear:zod.number().refine((value)=>{
      if(value>=1000 && value<=year)return 1;
      return 0;
    })
  })
  const updateCheck = zod.object({
    title:zod.string(),
    author:zod.string().min(1),
    publicationYear:zod.number().refine((value)=>{
      if(value>=1000 && value<=year)return 1;
      return 0;
    }),
    title_update:zod.string(),
    author_update:zod.string().min(1),
    publicationYear_update:zod.number().refine((value)=>{
      if(value>=1000 && value<=year)return 1;
      return 0;
    })
  })
module.exports={
    userDataCheck,
    inputCheck,
    updateCheck
}