import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt(
    [
      {
        message:' Type in your URL please : ',
        name:'URL',
        type:'input',
      },
    ]
  )
  .then((ans)=>{
    const url = ans.URL ;
    const randomStr =  Math.floor(Math.random() * 1000000).toString(36) ;
    
    const qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream(`./images/qr_code_${randomStr}.png`));

    fs.appendFile('url.txt',`\n${randomStr} -> ${url}`,(err)=>{
      if(err) throw err;
      console.log('file has been created')
    })
  })
  .catch((error)=>{
    if(error.isTtyError){
      console.error(" Prompt couldn't be rendered in the current environment ");
    }else{
      console.error(" Something else went wrong ");
    }
  })
