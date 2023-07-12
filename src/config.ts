import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';


export default async () => {
    console.log('process.cwd()',process.cwd())
    const configFilePath = join(process.cwd(), 'aaa.yaml');
    console.log('configFilePath',configFilePath)
    const config = await readFile(configFilePath);
    console.log('fff')

    const data = yaml.load(config);

    console.log('data',data)

    return data
};
