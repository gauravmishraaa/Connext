package com.scm.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scm.entities.Query;
import com.scm.repositories.QueryRepo;
import com.scm.services.QueryService;

@Service
public class QueryServiceImpl implements QueryService {

    @Autowired
    QueryRepo queryRepo;

    @Override
    public Query saveQuery(Query query) {
        return queryRepo.save(query);
    }

}
