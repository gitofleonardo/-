var option={
    title:{
        text:"审核完成情况"
    },
    tooltip:{},
    lengend:{
        data:["完成情况"]
    },
    series:[{
        name:"申请处理情况",
        type:"pie",
        data:[
            {value:0,name:"待审核"},
            {value:0,name:"审核通过"},
            {value:0,name:"未通过"},
            {value:0,name:"资料待修改"}
        ]
    }]
}
var appliesData=[]
const appliesInterface="http://192.168.0.103:82/companycheck.php"
const markStatusServer="http://192.168.0.103:82/companyupdate.php"
const submitServer="http://192.168.0.103:82/companysubmit.php"
var chart
var current=0
var currentDetailId

$(document).ready(function(){
    chart = echarts.init(document.getElementById("progress"))
    chart.setOption(option)
    loadApplies()
})
function showImgNew(str){
    var newwin=window.open()
    newwin.window.location=str
}
function filterApplies(){
    var input=document.getElementById("filter-text").value
    if (input==undefined || input==""){
        loadApplies(appliesData)
    }
    var pattern=new RegExp(input)
    var result=appliesData.filter(function(value){
        if (pattern.test(value["username"])){
            return value
        }
    })
    loadIntoTable(result)
}
function setPieOption(a1,a2,a3,a4){
    var data=[]
    data.push({value:a1,name:"待审核"})
    document.getElementById("waiting").innerText="待审核:"+a1+"人"
    data.push({value:a2,name:"审核通过"})
    document.getElementById("passed").innerText="审核通过:"+a2+"人"
    data.push({value:a3,name:"未通过"})
    document.getElementById("rejected").innerText="未通过:"+a3+"人"
    data.push({value:a4,name:"资料待修改"})
    document.getElementById("modified").innerText="资料待修改:"+a4+"人"
    option["series"][0].data=data
    chart.setOption(option)
}
function loadApplies(){
    var xh=new XMLHttpRequest()
    xh.open("GET",appliesInterface,true)
    xh.onreadystatechange=function(){
        if (xh.readyState==4){
            if (xh.status==200){
                try{
                    var text=xh.responseText
                    var result=JSON.parse(text)
                    if (result.length<=0){
                        setPieOption(0,0,0,0)
                        return
                    }
                    var status1=0
                    var status2=0
                    var status3=0
                    var status4=0
                    var container=document.getElementById("apply-body")
                    container.innerText=""
                    appliesData=result
                    for (var i=0;i<result.length;i++){
                        var item=result[i]
                        console.log(item)
                        var tr=buildTableRow(item)
                        console.log(tr)
                        container.appendChild(tr)
                        var status=item["status"]
                        switch(status){
                            case 0:status1++;
                            break;
                            case 1:status2++;
                            break;
                            case 2:status3++;
                            break;
                            case 3:status4++;
                            break;
                        }
                    }
                    setPieOption(status1,status2,status3,status4)
                }catch(e){
                    console.log(e)
                    alert("服务器内部错误")
                }
            }else{
                alert("申请表格加载失败，请检查网络连接")
            }
        }
    }
    xh.send("")
}
function loadIntoTable(datas){
    var container=document.getElementById("apply-body")
    container.innerText=""
    for (var i=0;i<datas.length;i++){
        container.appendChild(buildTableRow(datas[i]))
    }
}
function buildTableRow(item){
    var id=item["id"]
    var name=item["username"]
    var entryTime=item["entryTime"]
    var contactNumber=item["phone"]
    var applyAmount=item["applyAmount"]
    var applyTime=item["applyTime"]
    var status=item["status"]

    var tr=document.createElement("tr")
    var td1=document.createElement("td")
    var td2=document.createElement("td")
    var td3=document.createElement("td")
    var td4=document.createElement("td")
    var td5=document.createElement("td")
    var td6=document.createElement("td")
    var td7=document.createElement("td")
    //var btn1=document.createElement("button")
    var btn2=document.createElement("button")
    var btnContainer=document.createElement("div")
    btnContainer.classList.add("linear-layout-horizontal")
    btn2.classList.add("btn","btn-primary")
    btn2.style.marginLeft="20px"

    //btn1.addEventListener("click",function(){
    //    passOrUndo(this)
    //})
    //btn1.id="process_"+id
    btn2.innerText="查看资料"
    btn2.id="detail_"+id
    btn2.addEventListener("click",function(){
        showDetail(this.id)
    })

    td1.innerText=name
    td2.innerText=entryTime
    td3.innerText=contactNumber
    td4.innerText=applyAmount
    td5.innerText=applyTime
    if (status==0){
        td6.classList.add("user-status-orange")
        td6.innerText="待处理"

        //btn1.classList.add("btn","btn-success")
        //btn1.innerText="通过"
    }else if (status==1){
        td6.classList.add("user-status-green")
        td6.innerText="审核通过"

        //btn1.classList.add("btn","btn-warning")
        //btn1.innerText="撤销"
    }else if (status==2){
        td6.classList.add("user-status-red")
        td6.innerText="未通过"

        //btn1.classList.add("btn","btn-warning")
        //btn1.innerText="撤销"
    }else if (status==3){
        td6.classList.add("user-status-blue")
        td6.innerText="需要修改"

        //btn1.classList.add("btn","btn-warning")
        //btn1.innerText="撤销"
    }
    //btnContainer.appendChild(btn1)
    btnContainer.appendChild(btn2)
    td7.appendChild(btnContainer)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)
    return tr
}
function hideApplyDetail(){
    var dom=document.getElementById("apply-detail")
    var container=document.getElementById("apply-container")
    container.style.display="none"
    dom.style.width="0px"
    dom.style.height="0px"
}
function showDetail(apply){
    var dom=document.getElementById("apply-detail")
    var container=document.getElementById("apply-container")
    container.style.display="flex"
    dom.style.width="1000px"
    dom.style.height="90%"

    var id=apply.substring(7,apply.length)
    var data=appliesData.find(function(value){
        if (value["id"]==id){
            return true
        }
    })
    if (data==undefined){
        alert("信息过期，请刷新")
        return
    }
    currentDetailId=id

    document.getElementById("username").innerText=data["username"]
    document.getElementById("id-code").innerText=data["idCode"]
    document.getElementById("phone").innerText=data["phone"]
    document.getElementById("company").innerText=data["companyName"]
    document.getElementById("user-post").innerText=data["userPost"]
    document.getElementById("entry-time").innerText=data["entryTime"]
    document.getElementById("canbao-time").innerText=data["canbaoTime"]
    document.getElementById("origin-company").innerText=data["originCompany"]
    document.getElementById("origin-company-location").innerText=data["originCompanyLocation"]
    document.getElementById("bank-number").innerText=data["bankCardNumber"]
    document.getElementById("bank-name").innerText=data["bankName"]
    document.getElementById("apply-amount").innerText=data["applyAmount"]
    document.getElementById("id-card-front").src=data["idCardImgFront"]
    document.getElementById("id-card-back").src=data["idCardImgBack"]
    document.getElementById("bank-card").src=data["bankCardImg"]
    document.getElementById("signature").src=data["signature"]
    document.getElementById("sign-name-input").src=data["signNameInput"]

    var contracts=data["contracts"]
    var conContainer=document.getElementById("contract-container")
    conContainer.innerText=""
    for (var i=0;i<contracts.length;i++){
        var img=document.createElement("img")
        img.addEventListener("click",function(){
            showImgNew(this.src)
        })
        img.classList.add("detail-img")
        img.src=contracts[i]
        conContainer.appendChild(img)
    }
    var insContainer=document.getElementById("ins-container")
    insContainer.innerText=""
    var ins=data["ins"]
    for (var i=0;i<ins.length;i++){
        var img=document.createElement("img")
        img.addEventListener("click",function(){
            showImgNew(this.src)
        })
        img.classList.add("detail-img")
        img.src=ins[i]
        insContainer.appendChild(img)
    }
}
var show=false
function showConclusion(){
    var conclusion=document.getElementById("conclusion")
    if (show){
        conclusion.style.width="0px"
        conclusion.style.height="0px"
        show=!show
    }else{
        conclusion.style.width="1000px"
        conclusion.style.height="500px"
        show=!show
    }
}
function loadIntoPdf(){
    var container=document.getElementById("pdf-body")
    var sum=0
    container.innerText=""
    for (var i=0;i<appliesData.length;i++){
        var item=appliesData[i]
        var status=item["status"]
        if (status!=1){
            continue
        }

        sum+=item["applyAmount"]

        var idCode=item["idCode"]
        var name=item["username"]
        var entryTime=item["entryTime"]
        var contactNumber=item["phone"]
        var applyAmount=item["applyAmount"]
        var bankNumber=item["bankCardNumber"]
        var bankName=item["bankName"]
        var canbaoTime=item["canbaoTime"]
    
        var tr=document.createElement("tr")
        var td1=document.createElement("td")
        var td2=document.createElement("td")
        var td3=document.createElement("td")
        var td4=document.createElement("td")
        var td5=document.createElement("td")
        var td6=document.createElement("td")
        var td7=document.createElement("td")
        var td8=document.createElement("td")
        var td9=document.createElement("td")

        td1.innerText=i+1
        td2.innerText=name
        td3.innerText=idCode
        td4.innerText=entryTime
        td5.innerText=canbaoTime
        td6.innerText=applyAmount
        td7.innerText=bankNumber
        td8.innerText=bankName
        td9.innerText=contactNumber


        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tr.appendChild(td7)
        tr.appendChild(td8)
        tr.appendChild(td9)

        container.appendChild(tr)
    }
    var trsum=document.createElement("tr")
    var td10=document.createElement("td")
    var td11=document.createElement("td")
    var td12=document.createElement("td")
    td10.innerText="合计"
    td11.innerText=sum
    trsum.appendChild(td10)
    trsum.appendChild(td11)
    trsum.appendChild(td12)
    container.appendChild(trsum)
}
function outputPdf(){
    loadIntoPdf()

    var content=document.getElementById("pdf-table")
    content.style.backgroundColor="#FFFFFF"
    html2canvas(content,{
        onrendered:function(canvas){
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
    
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 592.28/contentWidth * contentHeight;
    
        var pageData = canvas.toDataURL('image/jpg', 1.0);
    
        var pdf = new jsPDF('', 'pt', 'a4');
        if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPG', 0, 0, imgWidth, imgHeight );
        } else {
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                  pdf.addPage();
                }
            }
        }
        pdf.save("all.pdf");
        }
    })
}
function onSetStatusChange(status){
    var xh=new XMLHttpRequest()
    xh.open("POST",markStatusServer,true)
    xh.onreadystatechange=function(){
        if (xh.readyState==4){
            if (xh.status==200){
                try{
                    var t=xh.responseText
                    var result=JSON.parse(t)
                    if (result["success"]){
                        alert("操作成功")
                        loadApplies()
                    }else{
                        alert("操作失败：未知错误")
                    }
                }catch(e){
                    alert("操作失败：未知错误")
                }

            }else{
                alert("操作失败，请检查网络连接")
            }
        }
    }
    var data=new FormData()
    data.append("id",parseInt(currentDetailId))
    data.append("status",parseInt(status))
    console.log()
    xh.send(data)
}
function submitAllApplies(){
    var date=new Date()
    var time=""+date.getFullYear()+date.getMonth()+date.getDate()
    var result=prompt("请在下方输入 "+time+" 以确认提交")
    if (result==time){
        confirmSubmit()
    }else{
        alert("取消提交")
    }
}
function confirmSubmit(){
    var xh=new XMLHttpRequest()
    xh.open("GET",submitServer,true)
    xh.onreadystatechange=function(){
        if (xh.readyState==4){
            if (xh.status==200){
                var t=xh.responseText
                var result=JSON.parse(t)
                if (result["success"]){
                    alert("提交成功")
                    loadApplies()
                }else{
                    alert("提交失败")
                }
            }else{
                alert("网络连接失败")
            }
        }
    }
    xh.send("")
}