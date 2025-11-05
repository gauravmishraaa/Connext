package com.scm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scm.entities.Query;

@Repository
public interface QueryRepo extends JpaRepository<Query, Integer> {

}
