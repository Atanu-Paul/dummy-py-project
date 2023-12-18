import styled from "styled-components";

export const AlertCoumnsDiv =styled.div`
width:100%;
min-height:450px;
.col-md-12{
    display: flex;
}
.col-md-4{
    margin: auto;
    width: 50%;
    padding: 10px;
}
.react-datepicker-wrapper{
    width:60%
}
.chart-one-container{
    height:400px;
    width:400px;
}
.date-picker-container{
    text-align: right;
    padding-bottom: 40px;
}
.chart-container{
    padding-top:40px;
   
}
.date-title{
    font-size:10px;
}
.timepicker-cst{
    margin-top:20px;
    display: inline-block;
    width: 60%;
}
.timepicker-cst .react-time-picker__wrapper{
    border: 1px solid #ced4da;
}
.timepicker-cst .react-time-picker__inputGroup{
    
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.filter-labels{
    font-size:15px;
    font-weight:500;
    margin-right: 5px;
}
.chart-legend{
    list-style:none;
    width:100%;
}
.chart-legend li{
    float:left;
    width:33.33%;
    margin-bottom: 15px;
}
.legend-icon{
    position:absolute;
    left: -20px;
    top: 5px
}
.legend-label{
    position:relative;
    color:#000000;
}
.grey{background-color: #cecfd1;height: 15px; width:15px; display:inline-block;}
.green{background-color: #c9e0c9;height: 15px; width:15px; display:inline-block;}
.yellow{background-color: #ddd1c6;height: 15px;  width:15px;display:inline-block;}
.red{background-color: #e0c9c9;height: 15px;  width:15px;display:inline-block;}
.critial-alert{
    border: 1px solid #000000 !important;
    width: 60%;
    text-align: center;
    display: inline-block;
    margin-top:20px;
}
.critital-title{
    text-align: center;
    font-size: 18px;
    padding: 5px;
    color: #757272;
}
.highlight-alert{
    font-weight: 600;
    font-size:18px;
}
.critical-message-container{
    display:inline-flex;
}
.critical-message{
    text-align: initial;
    margin-left: 20px;
}
`;