import { program } from 'commander'
import codeReview from './codeReview'

program.version('1.0.0').description('dbky办公自动化命令行工具')

// 按时间范围的代码改动审查命令
program
    .command('cr')
    .description('代码改动审查')
    .requiredOption('-s|--since <date>', '开始时间')
    .requiredOption('-u|--until <date>', '结束时间')
    .requiredOption('-a|--author <name>', '搜索的用户')
    .action(({ since, until, author }) => {
        console.log(
            `解析入参：过滤从${since},到${until}时间范围，提交者为${author}的提交记录`,
        )
        codeReview(since, until, author)
    })
// dbky cr -s "2025-07-01 00:00:00" -u "2025-07-31 23:59:59" -a "cheekhan"
// dbky cr -s "2024-01-01 00:00:00" -u "2025-10-31 23:59:59" -a "cheekhan"

program.parse()
