<?php

namespace Trade17\Tests;

use PDO;
use Skills17\PHPUnit\Database\ReadTest;

class QueriesTest extends ReadTest
{
    protected $srcFolder = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'src';

    protected function executeCompetitorQuery(string $fileName): array
    {
        $query = file_get_contents($this->srcFolder . DIRECTORY_SEPARATOR . $fileName);
        $stmt = $this->db->query($this->stripSqlComments($query));
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function stripSqlComments(string $sql): string
    {
        // remove the / * * / style comments
        $sql = preg_replace('%(/\*)(.*?)(\*/)%s', '', $sql);

        // remove the — style comments
        $sql = preg_replace('%(—).*%', '', $sql);

        return $sql;
    }

    protected function assertContainsRow($res, $row)
    {
        $this->assertEquals(
            in_array($row, $res),
            true,
            "Expected result to contain row:\n" . json_encode($row, JSON_PRETTY_PRINT) . "\nBut got:\n" . json_encode($res, JSON_PRETTY_PRINT)
        );
    }

    /**
     * The query should return the expected rows.
     *
     * @medium
     */
    public function testQuery1()
    {
        $res = $this->executeCompetitorQuery('query1.sql');

        $this->assertEquals(2, count($res), 'Expected result to have two rows');
        $this->assertContainsRow($res, ['name' => 'Daniel Cord', 'age' => '18']);
        $this->assertContainsRow($res, ['name' => 'Nicole Kaiser', 'age' => '19']);
    }

    /**
     * The query should return the expected rows.
     *
     * @medium
     */
    public function testQuery2()
    {
        $res = $this->executeCompetitorQuery('query2.sql');

        $this->assertEquals(2, count($res), 'Expected result to have two rows');
        $this->assertContainsRow($res, ['id' => '2', 'name' => 'WorldSkills 2022', 'date' => '2022-10-12', 'competitors' => '2']);
        $this->assertContainsRow($res, ['id' => '4', 'name' => 'EuroSkills 2023', 'date' => '2023-09-05', 'competitors' => '3']);
    }
}
