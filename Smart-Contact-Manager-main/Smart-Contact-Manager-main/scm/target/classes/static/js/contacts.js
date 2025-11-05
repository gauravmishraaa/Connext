console.log("contac js");

const viewContactModal = document.getElementById("view_contact_modal");

const baseURL= "http://localhost:8091";

// options with default values
const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    },
};

// instance options object
const instanceOptions = {
  id: 'modalEl',
  override: true
};


const contactModal=new Modal(viewContactModal, options, instanceOptions);

function openContactModal(){
    contactModal.show();
}
function closeContactModal(){
    contactModal.hide();
}

async function loadContactData(id) {
    try {
        const data=await(await fetch(`${baseURL}/api/contacts/${id}`)).json();
        document.querySelector("#contact_name").innerHTML=data.name;
        document.querySelector("#contact_email").innerHTML=data.email;
        document.querySelector("#contact_image").src=data.picture;
        document.querySelector("#contact_address").innerHTML=data.address;
        document.querySelector("#contact_phone").innerHTML=data.phoneNumber;
        document.querySelector("#contact_about").innerHTML=data.description;
        openContactModal();
        const contactFavourite= document.querySelector("#contact_favourite");
        if(data.favourite){
            contactFavourite.innerHTML="<i class='fa-solid fa-star'></i><i class='fa-solid fa-star'></i><i class='fa-solid fa-star'></i><i class='fa-solid fa-star'></i><i class='fa-solid fa-star'></i>"
        }else{
            contactFavourite.innerHTML="Not favourite contact"
        }

      if (data.websiteLink) {
            document.querySelector("#contact_website").href = data.websiteLink;
            document.querySelector("#contact_website").innerHTML = data.websiteLink;
        } else {
            document.querySelector("#contact_website").innerHTML = "No website available";
        }
        if (data.linkedInLink) {
            document.querySelector("#contact_linkedIn").href = data.linkedInLink;
            document.querySelector("#contact_linkedIn").innerHTML = data.linkedInLink;
        } else {
            document.querySelector("#contact_linkedIn").innerHTML = "No LinkedIn profile available";
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
}

//Delete Contact
async function deleteContact(id) {
    Swal.fire({
        title: "Do you want to delete the Contact?",
        icon:"warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
            const url=`${baseURL}/user/contacts/delete/`+id;
          window.location.replace(url);
        } 
      });
    
}