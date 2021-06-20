import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'


    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

const showToast = ({icon, text}) =>{
  // Swal.fire('Any fool can use a computer')



    //   console.log(icon)
    //   console.log(text)
      Toast.fire({
        icon: icon,
        title: text
      })

}



export default {showToast}