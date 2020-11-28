const puppeteer = require('puppeteer')
const fs = require('fs')

void(async () => {
    try{
        const browser = await puppeteer.launch()

        const page = await browser.newPage()

        await page.goto("https://scrapethissite.com/pages/forms/")

        const teams = await page.evaluate(() => {

            const TEAM_ROW_SELECTOR = `tr.team`
        
            const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR)
        
            const grabFromRow = (row, classname) => row
                .querySelector(`td.${classname}`)
                .innerText
                .trim()
        
            const data = []
        
            for(const tr of teamRows){
                data.push({
                    name: grabFromRow(tr, 'name'),
                    year: grabFromRow(tr, 'year'),
                    wins: grabFromRow(tr, 'wins'),
                    losses: grabFromRow(tr, 'losses')
                })
            }
        
            return data
        })

        fs.writeFile(
            './json/teams.json',
            JSON.stringify(teams, null, 2),
            (err) => err? console.error('Data not written!',err) : console.log('Data written!')    
        )
        
        await browser.close()
        
    }catch(error){
        console.log(data)
    }
    
})()


