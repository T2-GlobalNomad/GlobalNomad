import '../../../chunk-42AJV46F.mjs';
import { dirname, join, sep } from 'node:path';
import { GoogleFontsDownloadError, GoogleFontsLoadingError } from 'storybook/internal/server-errors';
import { fetchCSSFromGoogleFonts } from 'next/dist/compiled/@next/font/dist/google/fetch-css-from-google-fonts';
import { getFontAxes } from 'next/dist/compiled/@next/font/dist/google/get-font-axes';
import { getGoogleFontsUrl } from 'next/dist/compiled/@next/font/dist/google/get-google-fonts-url';
import { validateGoogleFontFunctionCall } from 'next/dist/compiled/@next/font/dist/google/validate-google-font-function-call';
import loaderUtils from 'next/dist/compiled/loader-utils3';
import { getProjectRoot } from 'storybook/internal/common';
import { validateLocalFontFunctionCall } from 'next/dist/compiled/@next/font/dist/local/validate-local-font-function-call';

var cssCache=new Map;async function getFontFaceDeclarations(options){let{fontFamily,weights,styles,selectedVariableAxes,display,variable}=validateGoogleFontFunctionCall(options.fontFamily,options.props),fontAxes=getFontAxes(fontFamily,weights,styles,selectedVariableAxes),url=getGoogleFontsUrl(fontFamily,fontAxes,display);try{let hasCachedCSS=cssCache.has(url),fontFaceCSS=hasCachedCSS?cssCache.get(url):await fetchCSSFromGoogleFonts(url,fontFamily,!0).catch(()=>null);if(hasCachedCSS?cssCache.delete(url):cssCache.set(url,fontFaceCSS),fontFaceCSS===null)throw new GoogleFontsDownloadError({fontFamily,url});return {id:loaderUtils.getHashDigest(url,"md5","hex",6),fontFamily,fontFaceCSS,weights,styles,variable}}catch(error){throw new GoogleFontsLoadingError({error,url})}}async function getFontFaceDeclarations2(options,rootContext,swcMode){let localFontSrc=options.props.src,parentFolder=swcMode?dirname(join(getProjectRoot(),options.filename)).replace(rootContext,""):dirname(options.filename).replace(rootContext,""),{weight,style,variable,declarations=[]}=validateLocalFontFunctionCall("",options.props),id=`font-${loaderUtils.getHashDigest(Buffer.from(JSON.stringify(localFontSrc)),"md5","hex",6)}`,fontDeclarations=declarations.map(({prop,value})=>`${prop}: ${value};`).join(`
`);return {id,fontFamily:id,fontFaceCSS:(()=>{if(typeof localFontSrc=="string"){let localFontPath=join(parentFolder,localFontSrc).replaceAll("\\","/");return `@font-face {
          font-family: ${id};
          src: url(.${localFontPath});
          ${fontDeclarations}
      }`}return localFontSrc.map(font=>{let localFontPath=join(parentFolder,font.path).replaceAll("\\","/");return `@font-face {
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
  `,fontFaceCSS=`${changeFontDisplayToSwap(options.fontFaceCSS)}`;return {className,fontFaceCSS,classNamesCSS,style,...options.variable?{variableClassName}:{}}}function getClassName({styles,weights,fontFamily}){let font=fontFamily.replaceAll(" ","-").toLowerCase(),style=isNextCSSPropertyValid(styles)?styles[0]:null,weight=isNextCSSPropertyValid(weights)?weights[0]:null;return `${font}${style?`-${style}`:""}${weight?`-${weight}`:""}`}function getStylesObj({styles,weights,fontFamily}){return {fontFamily,...isNextCSSPropertyValid(styles)?{fontStyle:styles[0]}:{},...isNextCSSPropertyValid(weights)?{fontWeight:weights[0]}:{}}}function isNextCSSPropertyValid(prop){return prop.length===1&&prop[0]!=="variable"}function changeFontDisplayToSwap(css){return css.replaceAll("font-display: optional;","font-display: block;")}function setFontDeclarationsInHead({id,fontFaceCSS,classNamesCSS}){return `
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
  `}async function storybookNextjsFontLoader(){let loaderOptions=this.getOptions(),swcMode=!1,options;if(Object.keys(loaderOptions).length>0)options=loaderOptions;else {let importQuery=JSON.parse(this.resourceQuery.slice(1));swcMode=!0,options={filename:importQuery.path,fontFamily:importQuery.import,props:importQuery.arguments[0],source:this.context.replace(this.rootContext,"")};}let rootCtx=this.rootContext,fontFaceDeclaration,pathSep=sep;if((options.source.endsWith(`next${pathSep}font${pathSep}google`)||options.source.endsWith(`@next${pathSep}font${pathSep}google`))&&(fontFaceDeclaration=await getFontFaceDeclarations(options)),(options.source.endsWith(`next${pathSep}font${pathSep}local`)||options.source.endsWith(`@next${pathSep}font${pathSep}local`))&&(fontFaceDeclaration=await getFontFaceDeclarations2(options,rootCtx,swcMode)),typeof fontFaceDeclaration<"u"){let cssMeta=getCSSMeta(fontFaceDeclaration);return `
    ${setFontDeclarationsInHead({fontFaceCSS:cssMeta.fontFaceCSS,id:fontFaceDeclaration.id,classNamesCSS:cssMeta.classNamesCSS})}

    module.exports = {
      className: "${cssMeta.className}", 
      style: ${JSON.stringify(cssMeta.style)}
      ${cssMeta.variableClassName?`, variable: "${cssMeta.variableClassName}"`:""}
    }
    `}return "module.exports = {}"}

export { storybookNextjsFontLoader as default };
