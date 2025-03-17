"use strict";var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var storybook_nextjs_font_loader_exports={};__export(storybook_nextjs_font_loader_exports,{default:()=>storybookNextjsFontLoader});module.exports=__toCommonJS(storybook_nextjs_font_loader_exports);var import_node_path2=require("path");var import_server_errors=require("storybook/internal/server-errors"),import_fetch_css_from_google_fonts=require("next/dist/compiled/@next/font/dist/google/fetch-css-from-google-fonts"),import_get_font_axes=require("next/dist/compiled/@next/font/dist/google/get-font-axes"),import_get_google_fonts_url=require("next/dist/compiled/@next/font/dist/google/get-google-fonts-url"),import_validate_google_font_function_call=require("next/dist/compiled/@next/font/dist/google/validate-google-font-function-call"),import_loader_utils3=__toESM(require("next/dist/compiled/loader-utils3")),cssCache=new Map;async function getFontFaceDeclarations(options){let{fontFamily,weights,styles,selectedVariableAxes,display,variable}=(0,import_validate_google_font_function_call.validateGoogleFontFunctionCall)(options.fontFamily,options.props),fontAxes=(0,import_get_font_axes.getFontAxes)(fontFamily,weights,styles,selectedVariableAxes),url=(0,import_get_google_fonts_url.getGoogleFontsUrl)(fontFamily,fontAxes,display);try{let hasCachedCSS=cssCache.has(url),fontFaceCSS=hasCachedCSS?cssCache.get(url):await(0,import_fetch_css_from_google_fonts.fetchCSSFromGoogleFonts)(url,fontFamily,!0).catch(()=>null);if(hasCachedCSS?cssCache.delete(url):cssCache.set(url,fontFaceCSS),fontFaceCSS===null)throw new import_server_errors.GoogleFontsDownloadError({fontFamily,url});return{id:import_loader_utils3.default.getHashDigest(url,"md5","hex",6),fontFamily,fontFaceCSS,weights,styles,variable}}catch(error){throw new import_server_errors.GoogleFontsLoadingError({error,url})}}var import_node_path=require("path"),import_common=require("storybook/internal/common"),import_validate_local_font_function_call=require("next/dist/compiled/@next/font/dist/local/validate-local-font-function-call"),import_loader_utils32=__toESM(require("next/dist/compiled/loader-utils3"));async function getFontFaceDeclarations2(options,rootContext,swcMode){let localFontSrc=options.props.src,parentFolder=swcMode?(0,import_node_path.dirname)((0,import_node_path.join)((0,import_common.getProjectRoot)(),options.filename)).replace(rootContext,""):(0,import_node_path.dirname)(options.filename).replace(rootContext,""),{weight,style,variable,declarations=[]}=(0,import_validate_local_font_function_call.validateLocalFontFunctionCall)("",options.props),id=`font-${import_loader_utils32.default.getHashDigest(Buffer.from(JSON.stringify(localFontSrc)),"md5","hex",6)}`,fontDeclarations=declarations.map(({prop,value})=>`${prop}: ${value};`).join(`
`);return{id,fontFamily:id,fontFaceCSS:(()=>{if(typeof localFontSrc=="string"){let localFontPath=(0,import_node_path.join)(parentFolder,localFontSrc).replaceAll("\\","/");return`@font-face {
          font-family: ${id};
          src: url(.${localFontPath});
          ${fontDeclarations}
      }`}return localFontSrc.map(font=>{let localFontPath=(0,import_node_path.join)(parentFolder,font.path).replaceAll("\\","/");return`@font-face {
          font-family: ${id};
          src: url(.${localFontPath});
          ${font.weight?`font-weight: ${font.weight};`:""}
          ${font.style?`font-style: ${font.style};`:""}
          ${fontDeclarations}
        }`}).join("")})(),weights:weight?[weight]:[],styles:style?[style]:[],variable}}function getCSSMeta(options){let className=getClassName(options),style=getStylesObj(options),variableClassName=`__variable_${className}`,classNamesCSS=`
    .${className} {
      font-family: ${options.fontFamily};
      ${isNextCSSPropertyValid(options.styles)?`font-style: ${options.styles[0]};`:""}
      ${isNextCSSPropertyValid(options.weights)?`font-weight: ${options.weights[0]};`:""}
    }

    ${options.variable?`.${variableClassName} { ${options.variable}: '${options.fontFamily}'; }`:""}
  `,fontFaceCSS=`${changeFontDisplayToSwap(options.fontFaceCSS)}`;return{className,fontFaceCSS,classNamesCSS,style,...options.variable?{variableClassName}:{}}}function getClassName({styles,weights,fontFamily}){let font=fontFamily.replaceAll(" ","-").toLowerCase(),style=isNextCSSPropertyValid(styles)?styles[0]:null,weight=isNextCSSPropertyValid(weights)?weights[0]:null;return`${font}${style?`-${style}`:""}${weight?`-${weight}`:""}`}function getStylesObj({styles,weights,fontFamily}){return{fontFamily,...isNextCSSPropertyValid(styles)?{fontStyle:styles[0]}:{},...isNextCSSPropertyValid(weights)?{fontWeight:weights[0]}:{}}}function isNextCSSPropertyValid(prop){return prop.length===1&&prop[0]!=="variable"}function changeFontDisplayToSwap(css){return css.replaceAll("font-display: optional;","font-display: block;")}function setFontDeclarationsInHead({id,fontFaceCSS,classNamesCSS}){return`
    if (!document.getElementById('id-${id}')) {
      const fontDeclarations = \`${fontFaceCSS}\`;
      const style = document.createElement('style');
      style.setAttribute('id', 'font-face-${id}');
      style.innerHTML = fontDeclarations;
      document.head.appendChild(style);

      const classNamesCSS = \`${classNamesCSS}\`;
      const classNamesStyle = document.createElement('style');
      classNamesStyle.setAttribute('id', 'classnames-${id}');
      classNamesStyle.innerHTML = classNamesCSS;
      document.head.appendChild(classNamesStyle);

    }
  `}async function storybookNextjsFontLoader(){let loaderOptions=this.getOptions(),swcMode=!1,options;if(Object.keys(loaderOptions).length>0)options=loaderOptions;else{let importQuery=JSON.parse(this.resourceQuery.slice(1));swcMode=!0,options={filename:importQuery.path,fontFamily:importQuery.import,props:importQuery.arguments[0],source:this.context.replace(this.rootContext,"")}}let rootCtx=this.rootContext,fontFaceDeclaration,pathSep=import_node_path2.sep;if((options.source.endsWith(`next${pathSep}font${pathSep}google`)||options.source.endsWith(`@next${pathSep}font${pathSep}google`))&&(fontFaceDeclaration=await getFontFaceDeclarations(options)),(options.source.endsWith(`next${pathSep}font${pathSep}local`)||options.source.endsWith(`@next${pathSep}font${pathSep}local`))&&(fontFaceDeclaration=await getFontFaceDeclarations2(options,rootCtx,swcMode)),typeof fontFaceDeclaration<"u"){let cssMeta=getCSSMeta(fontFaceDeclaration);return`
    ${setFontDeclarationsInHead({fontFaceCSS:cssMeta.fontFaceCSS,id:fontFaceDeclaration.id,classNamesCSS:cssMeta.classNamesCSS})}

    module.exports = {
      className: "${cssMeta.className}", 
      style: ${JSON.stringify(cssMeta.style)}
      ${cssMeta.variableClassName?`, variable: "${cssMeta.variableClassName}"`:""}
    }
    `}return"module.exports = {}"}
