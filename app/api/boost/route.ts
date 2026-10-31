import {deflateRawSync,inflateRawSync} from 'node:zlib';
export const runtime='nodejs';
const MAGIC='7e8bb5a89f2842ac4af01b3b7e228592';
export async function POST(request:Request){try{
 const body=await request.text();if(body.length>2_000_000)return Response.json({error:'Save is too large.'},{status:413});
 const {save,gold,souls,rubies}=JSON.parse(body);
 if(typeof save!=='string')throw Error('Paste a valid save.');
 const cleaned=save.replace(/\s/g,'');if(!cleaned.startsWith(MAGIC))throw Error('Unsupported format. Export a Unity save starting 7e8bb5a8.');
 for(const value of [gold,souls])if(typeof value!=='string'||value.length>100||!/^\d+(?:\.\d+)?(?:e\+?\d+)?$/i.test(value))throw Error('Use positive amounts such as 1e1000000.');
 const rubyNumber=Number(rubies);if(typeof rubies!=='string'||!rubies.trim()||!Number.isSafeInteger(rubyNumber)||rubyNumber<0)throw Error('Rubies must be an integer between 0 and 9007199254740991.');
 const data=JSON.parse(inflateRawSync(Buffer.from(cleaned.slice(MAGIC.length),'base64'),{maxOutputLength:16_000_000}).toString('utf8'));
 if(!data||typeof data!=='object'||!['gold','heroSouls','rubies'].every(key=>Object.hasOwn(data,key)))throw Error('Missing expected currency fields.');
 data.gold=gold;data.heroSouls=souls;data.rubies=rubyNumber;
 const json=JSON.stringify(data),compressed=deflateRawSync(json);if(inflateRawSync(compressed).toString()!==json)throw Error('Verification failed.');
 return Response.json({save:MAGIC+compressed.toString('base64')},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Invalid save or currency values. Use a complete Unity save and valid positive amounts.'},{status:400})}}
