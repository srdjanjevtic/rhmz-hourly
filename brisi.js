// let str = "28112022"
// let v = '1700'
// // str = str.split('')
// // str = str.slice(2,0,'/')
// // str = str.slice(5, 0, '/')
// // console.log(str.join(''))
// // const date = new Date()

// // console.log(date)
// str = insertString(str, '-', 2)
// str = insertString(str, '-', 5)
// str = str.split('-').reverse().join('-')

// v = insertString(v, ':', 2)
// const final = str + 'T' + v
// console.log(final)

// console.log(new Date(final))
//  function insertString(original='27112022', add, idx) {
//             // let origString = "GeeksGeeks";
//             // let stringToAdd = "For";
//             // let indexPosition = 5;
  
//             // Split the string into individual
//             // characters
//             original = original.split('')
  
//             // Insert the string at the index position
//             original.splice(idx, 0, add)
  
//             // Join back the individual characters
//             // to form a new string
//      newString = original.join('')
//      return newString
// }
    


// (async () => {
//     const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);
//     const finalPath = path.resolve(__dirname, '../public/spacex-uj3hvdfQujI-unsplash.jpg');
//     const folderName = 'Picture';
//     if (!fs.existsSync(finalPath)) {
//         throw new Error('File not found!');
//     }
//     let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
//         console.error(error);
//         return null;
//     });
//     if (!folder) {
//         folder = await googleDriveService.createFolder(folderName);
//     }
//     await googleDriveService.saveFile('SpaceX', finalPath, 'image/jpg', folder.id).catch((error) => {
//         console.error(error);
//     });
//     console.info('File uploaded successfully!');
//     // Delete the file on the server
//     fs.unlinkSync(finalPath);
// })();