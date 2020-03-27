var idCardFrontAvailable=false
var idCardBackAvailable=false
var bankCardAvailable=false
var contractList=[]
var insList=[]
const serverIDCardFront="http://192.168.0.103:82/idcardnormal.php"
const serverIDBack="http://192.168.0.103:82/idcardback.php"
const serverBankCard="http://192.168.0.103:82/bankcard.php"
const serverEnterpriseInterface="http://192.168.0.103:82/qiye.php"
const serverPostInformation="http://192.168.0.103:82/uploaddata.php"
const serverStatusPassed="http://192.168.0.103:82/firstcheck.php"

$(document).ready(function(){
    initPaint()
    loadCompany()
    initTime()
    checkIfStatusPassed()
})
function checkIfStatusPassed(){
    var xh=new XMLHttpRequest()
    xh.open("GET",serverStatusPassed,true)
    xh.onreadystatechange=function(e){
        if (xh.readyState==4){
            if (xh.status==200){
                var text=xh.responseText
                var result=JSON.parse(text)
                console.log(result)
                if (result["passed"]){
                    document.getElementById("all-submit").disabled="disabled"
                }
            }
        }
    }
    xh.send("")
}
function initTime(){
    var date=new Date()
    var year=date.getFullYear()
    var month=date.getMonth()
    if (date.getMonth()<10){
        month="0"+(date.getMonth()+1)
    }
    var day=date.getDate()
    if (date.getDate()<10){
        day="0"+date.getDate()
    }
    var d=year+"-"+month+"-"+day
    document.getElementById("entry-time").value=d
    document.getElementById("canbao-time").value=d
}
function loadCompany(){
    var xh=new XMLHttpRequest()
    xh.open("GET",serverEnterpriseInterface,true)
    xh.onreadystatechange=function(){
        if (xh.readyState==4 && xh.status==200){
            var coms=JSON.parse(xh.responseText)
            var container=document.getElementById("company")
            for (var i=0;i<coms.length;i++){
                var option=document.createElement("option")
                option.value=coms[i]["id"]
                option.innerText=coms[i]["name"]
                container.appendChild(option)
            }
        }
    }
    xh.send("")
}
function clearName(){
    $("#sign-name").jSignature("clear")
}
function initPaint(){
    $("#sign-name").jSignature({
        height:300,
        color:"#00bfff",
        lineWidth:5
    })
}
function chooseImgFront(){
    $("#id-card-img-front").click()
}
function chooseImgBack(){
    $("#id-card-img-back").click()
}
function chooseBankCard(){
    $("#bank-card-file").click()
}
function onBankCardChanged(event){
    if (event.target.files[0]==undefined) return
    bankCardAvailable=false
    var img=document.getElementById("bank-card-file").files[0]
    var bankLoad=document.getElementById("loadingToast")
    bankLoad.style.display="block"
    document.getElementById("bank-card-number").value=""
    document.getElementById("bank-name").value=""
    var data=new FormData()
    data.append("file",img)
    var xh=new XMLHttpRequest()
    xh.open("POST",serverBankCard,true)
    xh.onreadystatechange=function(){
        if (xh.readyState==4){
            if (xh.status==200){
                try{
                    var result=JSON.parse(xh.responseText)
                    if (result[0]["success"]){
                        document.getElementById("bank-card-number").value=result[0]["number"]
                        document.getElementById("bank-name").value=result[0]["name"]
                        bankCardAvailable=true
                    }else{
                        bankCardAvailable=false
                    }
                    bankLoad.style.display="none"
                }catch(e){
                    bankCardAvailable=false
                    bankLoad.style.display="none"
                }
            }else{
                bankLoad.style.display="none"
                bankCardAvailable=false
            }
        }
    }
    xh.send(data)
}
function onIdImageChangedFront(event){
    const img=document.getElementById("preview-img-front")
    var imgFile=event.target.files[0]
    if (imgFile==undefined) return
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
    idCardFrontAvailable=false
    var progress=document.getElementById("front-progress")
    var hint=document.getElementById("front-title")
    progress.style.display="block"
    progress.src="loading.gif"
    hint.innerText="正在验证"
    var data=new FormData()
    data.append("file",dom.files[0])
    var xmlhttp;
    if (window.XMLHttpRequest){
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
      }
      else{
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                try{
                    var result=JSON.parse(xmlhttp.responseText)
                    console.log(result)
                    if (result[0]["success"]){
                        progress.src="success.png"
                        hint.innerText="验证成功"
                        var uid=result[0]["id"]
                        var name=result[0]["name"]
                        document.getElementById("id-code").value=uid
                        document.getElementById("username").value=name
                        idCardFrontAvailable=true
                    }else{
                        idCardFrontAvailable=false
                        progress.src="error.png"
                        hint.innerText="验证失败，请重新检查"
                    }
                }catch(e){
                    idCardFrontAvailable=false
                    progress.src="error.png"
                    hint.innerText="验证失败，请重新检查"
                }
            }else{
                idCardFrontAvailable=false
                progress.src="error.png"
                hint.innerText="验证失败，请重新检查"
            }
        }
      }
    xmlhttp.open("POST",serverIDCardFront,true);
    xmlhttp.send(data);
}
function checkIDCardBack(dom){
    idCardBackAvailable=false
    var progress=document.getElementById("back-progress")
    var hint=document.getElementById("back-title")
    progress.style.display="block"
    progress.src="loading.gif"
    hint.innerText="正在验证"
    var data=new FormData()
    data.append("file",dom.files[0])
    var xmlhttp;     //上传书本封面
    if (window.XMLHttpRequest){
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
      }
      else{
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                try{
                    var result=JSON.parse(xmlhttp.responseText)
                    console.log(result)
                    if (result[0]["success"]){
                        idCardBackAvailable=true
                        progress.src="success.png"
                        hint.innerText="验证成功"
                    }else{
                        idCardBackAvailable=false
                        progress.src="error.png"
                        hint.innerText="验证失败，请重新检查"
                    }
                }catch(e){
                    idCardBackAvailable=false
                    progress.src="error.png"
                    hint.innerText="验证失败，请重新检查"
                }
            }else{
                idCardBackAvailable=false
                progress.src="error.png"
                hint.innerText="验证失败，请重新检查"
            }
        }
      }
    xmlhttp.open("POST",serverIDBack,true);
    xmlhttp.send(data);
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
function convertBase64ToBlob(data){
    var bytes=window.atob(data[1])
    var ab=new ArrayBuffer(bytes.length)
    var ia=new Uint8Array(ab)
    for (var i=0;i<bytes.length;i++){
        ia[i]=bytes.charCodeAt(i)
    }
    return new Blob([ab],{type:"image/jpg"})
}
function conformSubmit(){
    if (!idCardFrontAvailable || !idCardBackAvailable || !bankCardAvailable){
        alert("信息仍未完整,请仔细核对")
        return
    }
    //文字数据
    var username=document.getElementById("username").value
    var idCode=document.getElementById("id-code").value
    var contactNumber=document.getElementById("phone").value
    var companyId=document.getElementById("company").value
    var userPost=document.getElementById("user-post").value
    var entryTime=document.getElementById("entry-time").value
    var canbaoTime=document.getElementById("canbao-time").value
    var originCompany=document.getElementById("origin-company").value
    var originCompanyLocation=document.getElementById("origin-company-location").value
    var bankCardNumber=document.getElementById("bank-card-number").value
    var bankName=document.getElementById("bank-name").value
    var applyAmount=document.getElementById("apply-amount").value
    var signNameInput=document.getElementById("sign-name-input").value
    console.log(username)
    console.log(idCode)
    console.log(contactNumber)
    console.log(companyId)
    console.log(userPost)
    console.log(entryTime)
    console.log(canbaoTime)
    console.log(originCompany)
    console.log(originCompanyLocation)
    console.log(bankCardNumber)
    console.log(bankName)
    console.log(applyAmount)
    console.log(signNameInput)
    
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
    || applyAmount==""
    ||username==undefined 
    || idCode==undefined 
    || contactNumber==undefined 
    || userPost==undefined 
    || entryTime==undefined 
    || canbaoTime==undefined 
    || originCompany==undefined 
    || originCompanyLocation==undefined 
    || bankCardNumber==undefined 
    || bankName==undefined 
    || applyAmount==undefined){
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
    var signature=$("#sign-name").jSignature("getData","image")
    console.log(signature)
    console.log($("#sign-name").jSignature("getData","native"))
    console.log(signNameInput)
    if ($("#sign-name").jSignature("getData","native").length==0 && (signNameInput==undefined || signNameInput=="")){
        alert("手写签名和输入框签名必须至少填写一项")
        return
    }
    //文字类型的数据
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

    //图片类型的数据
    formData.append("idCardImgFront",idFront)
    formData.append("idCardImgBack",idBack)
    formData.append("bankCardImg",bankCardImg)
    formData.append("signature",convertBase64ToBlob(signature))
    formData.append("contracts",contracts.length)
    formData.append("ins",ins.length)
    
    var i=0
    for (;i<contracts.length;i++){
        formData.append("contracts_"+i,contracts[i])
    }
    i=0
    for (;i<ins.length;i++){
        formData.append("ins_"+i,ins[i])
    }
    var xh=new XMLHttpRequest()
    xh.open("POST",serverPostInformation,true)
    xh.onreadystatechange=function(){
        if (xh.readyState==4){
            if (xh.status==200){
                try{
                    var text=xh.responseText
                    console.log(text)
                    var result=JSON.parse(text)
                    if (result["success"]){
                        hideSubmitting()
                        return
                    }
                }catch(e){
                    showSubmittingError()
                }
            }
            showSubmittingError()
        }
    }
    showSubmitting()
    xh.send(formData)
}

function showSubmittingError(){
    var alert=document.getElementById("uploading-alert")
    var text=document.getElementById("upload-text")
    text.innerText="上传失败"
    alert.classList=[]
    alert.classList.add("alert")
    alert.classList.add("alert-warning")
    var img=document.getElementById("alert-img")
    img.src="error.png"
}
function showSubmitting(){
    var alert=document.getElementById("uploading-alert")
    var text=document.getElementById("upload-text")
    text.innerText="上传中"
    alert.style.display="block"
    alert.classList=[]
    alert.classList.add("alert")
    alert.classList.add("alert-warning")
    var img=document.getElementById("alert-img")
    img.src="loading.gif"
}
function hideSubmitting(){
    var alert=document.getElementById("uploading-alert")
    var text=document.getElementById("upload-text")
    text.innerText="成功"
    alert.classList=[]
    alert.classList.add("alert")
    alert.classList.add("alert-success")
    var img=document.getElementById("alert-img")
    img.src="success.png"

    document.getElementById("all-submit").disabled="disabled"
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