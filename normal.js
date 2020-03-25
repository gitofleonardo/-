var idCardFrontAvailable=true
var idCardBackAvailable=true
var bankCardAvailable=true
var contractList=[]
var insList=[]

$(document).ready(function(){
    initPaint()
    loadCompany()
})
function loadCompany(){
    $.ajax({
        url:"http://localhost:82/qiye.php",
        type:"GET",
        crossDomain:true,
        data:"",
        success:function(result){
            var coms=JSON.parse(result)
            var container=document.getElementById("company")
            for (var i=0;i<coms.length;i++){
                var option=document.createElement("option")
                option.value=coms[i]["id"]
                option.innerText=coms[i]["name"]
                container.appendChild(option)
            }
        },
        error:function(){
            alert("获取单位信息失败，请刷新页面")
        }
    })
}
function clearName(){
    $("#sign-name").jSignature("clear")
}
function initPaint(){
    $("#sign-name").jSignature({
        height:300,
        color:"#00bfff",
        lineWidth:10
    })
}
function chooseImgFront(){
    $("#id-card-img-front").click()
}
function chooseImgBack(){
    $("#id-card-img-back").click()
}
function chooseBankCard(){
    console.log("click choose")
    $("#bank-card-file").click()
}
function onBankCardChanged(){

}
function onIdImageChangedFront(event){
    const img=document.getElementById("preview-img-front")
    var imgFile=event.target.files[0]
    var URL=window.URL || window.webkitURL
    var imgUrl=URL.createObjectURL(imgFile)
    console.log(imgUrl)
    img.src=imgUrl

    checkIDCardFront(document.getElementById("id-card-img-front"))
}
function onIdImageChangedBack(event){
    const img=document.getElementById("preview-img-back")
    var imgFile=event.target.files[0]
    var URL=window.URL || window.webkitURL
    var imgUrl=URL.createObjectURL(imgFile)
    console.log(imgUrl)
    img.src=imgUrl

    checkIDCardBack(document.getElementById("id-card-img-back"))
}

function checkIDCardFront(dom){
    console.log(dom.files[0])
    var progress=document.getElementById("front-progress")
    var hint=document.getElementById("front-title")
    progress.style.display="block"
    progress.src="loading.gif"
    hint.innerText="正在验证"
    var target="http://localhost:82/idcardnormal.php"
    var data=new FormData()
    data.append("front",dom.files[0])
    $.ajax({
        url:target,
        type:"post",
        processData:false,
        data:data,
        success:function(result){
            //console.log(result)
            if (result["success"]){
                progress.src="success.png"
                hint.innerText="验证成功"
                var uid=result["id"]
                var name=result["name"]
                $("#username").value=name
                $("#id-code").value=uid
            }else{
                progress.src="error.png"
                hint.innerText="验证失败，请重新检查"
            }
        },
        error:function(){
            progress.src="error.png"
            hint.innerText="验证失败"
        }
    })
}
function checkIDCardBack(dom){
    var progress=document.getElementById("back-progress")
    var hint=document.getElementById("back-title")
    progress.style.display="block"
    progress.src="loading.gif"
    hint.innerText="正在验证"
    var target="http://localhost/CheckBack"
    var data=new FormData()
    data.append("back",dom.files[0])
    $.ajax({
        url:target,
        type:"post",
        processData:false,
        data:data,
        success:function(result){
            //console.log(result)
            if (result["success"]){
                progress.src="success.png"
                hint.innerText="验证成功"
            }else{
                progress.src="error.png"
                hint.innerText="验证失败，请重新检查"
            }
        },
        error:function(){
            progress.src="error.png"
            hint.innerText="验证失败"
        }
    })
}

function goToPage2(){
    var page1=document.getElementById("page-one")
    var page2=document.getElementById("page-two")
    var page3=document.getElementById("page-three")
    page1.style.display="none"
    page2.style.display="block"
    page3.style.display="none"
}
function goToPage1(){
    var page1=document.getElementById("page-one")
    var page2=document.getElementById("page-two")
    var page3=document.getElementById("page-three")
    page1.style.display="block"
    page2.style.display="none"
    page3.style.display="none"
}
function goToPage3(){
    var page1=document.getElementById("page-one")
    var page2=document.getElementById("page-two")
    var page3=document.getElementById("page-three")
    page1.style.display="none"
    page2.style.display="none"
    page3.style.display="block"
}

function conformSubmit(){
    if (!idCardFrontAvailable || !idCardBackAvailable || !bankCardAvailable){
        alert("信息仍未完整,请仔细核对")
        return
    }
    //文字数据
    var username=$("#username").value
    var idCode=$("#id-code").value
    var contactNumber=$("#phone").value
    var companyId=$("#company").value
    var userPost=$("#user-post").value
    var entryTime=$("#entry-time").value
    var canbaoTime=$("#canbao-time").value
    var originCompany=$("#origin-company").value
    var originCompanyLocation=$("#origin-company-location").value
    var bankCardNumber=$("#bank-card-number").value
    var bankName=$("#bank-name").value
    var applyAmount=$("#apply-amount").value
    var signNameInput=$("#sign-name-input").value
    if (username=="" 
    || idCode=="" 
    || contactNumber==""
    || companyId==-1
    || userPost==""
    || entryTime==""
    || canbaoTime==""
    || originCompany==""
    || originCompanyLocation==""
    || bankCardNumber==""
    || bankName==""
    || applyAmount==""){
        alert("信息未完整！请仔细检查")
        return
    }
    //文件数据
    var idFront=document.getElementById("id-card-img-front").files[0]
    var idBack=document.getElementById("id-card-img-back").files[0]
    var bankCardImg=document.getElementById("bank-card-file").files[0]
    var laborContracts=document.getElementById("add-labor-contract")
    var laborContractCount=laborContracts.children.length
    if (laborContractCount<=2){
        alert("您还未上传劳动合同")
        return
    }
    var insRecords=document.getElementById("add-ins-entry")
    var insRecordCount=insRecords.children.length
    if (insRecordCount<=2){
        alert("您还未上传养老保险明细记录")
        return
    }
    var contracts=[]
    var start=0
    var i=2
    for (;i<laborContractCount;i++){
        contracts.push(laborContracts.children[i].withFile)
        start++
    }
    start=0
    var ins=[]
    i=2
    for (;i<insRecordCount;i++){
        ins.push(insRecords.children[i].withFile)
        start++
    }
    console.log(contracts)
    console.log(ins)
    var signature=$("#sign-name").jSignature("getData","default")
    console.log($("#sign-name").jSignature("getData","native"))
    console.log(signNameInput)
    if ($("#sign-name").jSignature("getData","native").length==0 && (signNameInput==undefined || signNameInput=="")){
        alert("手写签名和输入框签名必须至少填写一项")
        return
    }
    var formData=new FormData()
    formData.append("username",username)
    formData.append("idCode",idCode)
    formData.append("phone",contactNumber)
    formData.append("company",companyId)
    formData.append("userPost",userPost)
    formData.append("entryTime",entryTime)
    formData.append("canbaoTime",canbaoTime)
    formData.append("originCompany",originCompany)
    formData.append("originCompanyLocation",originCompanyLocation)
    formData.append("bankCardNumber",bankCardNumber)
    formData.append("bankName",bankName)
    formData.append("applyAmount",applyAmount)
    formData.append("signNameInput",signNameInput)
    formData.append("idCardImgFront",idFront)
    formData.append("idCardImgBack",idBack)
    formData.append("bankCardImg",bankCardImg)
    formData.append("signature",signature)
    
    var i=0
    for (;i<contracts.length;i++){
        formData.append("contracts",contracts[i])
    }
    i=0
    for (;i<ins.length;i++){
        formData.append("ins",ins[i])
    }
    $.ajax({
        url:"http://localhost/PostData",
        type:"post",
        mimeType: "multipart/form-data",
        processData:false,
        data:formData,
        contentType:false,
        success:function(result){
            console.log(result)
        },
        error:function(){

        }
    })
}
function onAddContract(event){
    var container=document.getElementById("add-labor-contract")
    var imgFile=event.target.files[0]
    console.log(imgFile)
    contractList.push(imgFile)
    var URL=window.URL || window.webkitURL
    var imgUrl=URL.createObjectURL(imgFile)
    var img=document.createElement("img")
    img.src=imgUrl
    img.classList.add("contract-img")
    var imgContainer=document.createElement("div")
    imgContainer.classList.add("img-container")
    imgContainer.appendChild(img)
    imgContainer.withFile=imgFile
    var close=document.createElement("img")
    close.src="error.png"
    close.addEventListener("click",function(){
        var result=confirm("确认删除")
        if (result){
            var parent=this.parentElement
            parent.remove(this)
        }
    })
    close.classList.add("delete-img")
    imgContainer.appendChild(close)
    container.appendChild(imgContainer)
}
function onAddInsChanged(event){
    var container=document.getElementById("add-ins-entry")
    var imgFile=event.target.files[0]
    contractList.push(imgFile)
    var URL=window.URL || window.webkitURL
    var imgurl=URL.createObjectURL(imgFile)
    var img=document.createElement("img")
    img.src=imgurl
    img.classList.add("contract-img")
    var imgContainer=document.createElement("div")
    imgContainer.classList.add("img-container")
    imgContainer.appendChild(img)
    imgContainer.withFile=imgFile
    var close=document.createElement("img")
    close.src="error.png"
    close.addEventListener("click",function(){
        var result=confirm("确认删除")
        if (result){
            var parent=this.parentElement
            parent.remove(this)
        }
    })
    close.classList.add("delete-img")
    imgContainer.appendChild(close)
    container.appendChild(imgContainer)
}
function addContract(){
    $("#add-contract-input").click()
}
function addInsEntry(){
    $("#add-ins-input").click()
}