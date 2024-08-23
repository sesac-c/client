// export const processImage = (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const img = new Image();
//             img.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');
//                 const size = Math.min(img.width, img.height);
//                 canvas.width = canvas.height = size;
//                 ctx.drawImage(
//                     img,
//                     (img.width - size) / 2,
//                     (img.height - size) / 2,
//                     size,
//                     size,
//                     0,
//                     0,
//                     size,
//                     size
//                 );
//                 resolve(canvas.toDataURL());
//             };
//             img.onerror = reject;
//             img.src = e.target.result;
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//     });
// };

export const processImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};