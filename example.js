import {readSync} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import rehypeRetext from 'rehype-retext'
import {inspect} from 'unist-util-inspect'
import retextEnglish from 'retext-english'
import retextPos from 'retext-pos'
import retextIndefiniteArticle from 'retext-indefinite-article'
import retextRepeatedWords from 'retext-repeated-words'

const file = readSync('example.html')

unified()
  .use(rehypeParse)
  .use(
    rehypeRetext,
    unified()
      .use(retextEnglish)
      .use(retextIndefiniteArticle)
      .use(retextRepeatedWords)
      .use(retextPos)
      .use(() => (tree) => {
        console.log(inspect(tree))
      })
  )
  // .use(rehypeRetext,
  //   unified().use(retextEnglish))
  // .use(rehypePresetMinify)
  // .use(() => (tree) => {
  //   console.log(inspect(tree))
  // })
  .use(rehypeStringify)
  .process(file)
  .then((file) => {
    console.error(reporter(file))
    // console.log(String(file))
  })